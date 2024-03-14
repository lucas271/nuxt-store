import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//userId === cartId in the db
export interface WishListBodyInterface {
    userId: string;
    productId: string;
    wishListItemId?: string;
}

export interface WishListQueryInterface {
    productId?: string;
    userId: string;
}

class WishList {
    public body: WishListBodyInterface | null | undefined;
    public query: WishListQueryInterface | null | undefined;
    public errors: string[];
    public response: any;
    public prisma: typeof prisma;

    constructor(body?: WishListBodyInterface, query?: WishListQueryInterface) {
        this.body = body;
        this.query = query;
        this.errors = [];
        this.response = null;
        this.prisma = prisma;
    }

    async getWishListItems() {
        if (!this.query?.userId) return this.errors.push("informações estão faltando");

        const items = await this.prisma.favorite.findMany({
            where: {
                user_id: this.query?.userId,
            },
            select: {
                product: true,
                id: true,
            }
        }).catch(err => this.errors.push("não foi possível obter os produtos"));

        if (this.errors.length > 0) return;
        this.response = items;
    }

    async getWishListItem() {
        if (!this.query?.userId || !this.query?.productId) return this.errors.push("informações estão faltando");

        const product = await this.prisma.favorite.findMany({
            where: {
                product_id: this.query.productId,
                user_id: this.query.userId
            },
            select: {
                product: true
            }
        }).catch(err => this.errors.push("não foi possível obter o produto"));

        if (this.errors.length > 0) return;

        this.response = product;
    }

    async addToWishList() {
        if (!this.body?.userId || !this.body?.productId) return this.errors.push("informações estão faltando");

        const newProduct = await this.prisma.favorite.create({
            data: {
                user_id: this.body.userId,
                product_id: this.body.productId
            },
            select: {
                product: true,
                id: true,
            }
        }).catch((error) => this.errors.push('erro ao criar o produto') && console.log(error));

        if (this.errors.length > 0) return;

        this.response = newProduct;
    }

    async removeFromWishList() {
        if (!this.body?.wishListItemId) return this.errors.push('você precisa do ID do item da lista de desejos para excluir um produto');
        if (!this.body?.userId) return this.errors.push('você precisa do ID do usuário para excluir um produto da lista de desejos');

        const deletedProduct = await this.prisma.favorite.delete({
            where: {
                id: this.body.wishListItemId
            },
            select: {
                product: true,
                id: true,
            }
        }).catch((err) => {
            console.log(err);
            this.errors.push('erro ao excluir o produto');
        });

        if (this.errors.length > 0) return;

        this.response = deletedProduct;
    }

    async removeAllFromWishList() {
        if (!this.body?.userId) return this.errors.push('você precisa do ID do usuário para excluir um produto da lista de desejos');

        const deletedProducts = await this.prisma.favorite.deleteMany({
            where: {
                user_id: this.body.userId
            }
        }).catch(() => this.errors.push('erro ao excluir os produtos'));

        if (this.errors.length > 0) return;

        this.response = deletedProducts;
    }
}

export default WishList;