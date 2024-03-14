import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

//userId === cartId in the db
export interface ProductBodyInterface{
    userId?: string
    productId?: string,
    name?: string,
    description?: string,
    title?: string,
    price?: number,
    img?: string,
    quantity?: number,
    productQuantIncrement?: number
    categoryName?: string,
}

export interface ProductQueryInterface{
    categoryName?: string,
    productId?: string,
    limit?: number,
    skip?: number,
    sortBy?: {
        isPriceAscending?: boolean,
        mostFavorites?: boolean,
        isNewer?: boolean,
    },
    startsWith?: string,
    includeSoldOut?: boolean,
}

class Product{
	public body: ProductBodyInterface | null | undefined
	public query: ProductQueryInterface | null | undefined
	public errors: String[]
	public response: any
	public prisma: typeof prisma
  
	constructor(body?: ProductBodyInterface, query?: ProductQueryInterface){

		this.body = body
		this.query = query
		this.errors = []
		this.response = null
		this.prisma = prisma
	}

	async getProducts(){
		const products = await this.prisma.product.findMany({
			skip: this.query?.skip || 0,
			take: this.query?.limit || 100, 
			where: {
				name: {
					startsWith: this.query?.startsWith || '',
					mode: "insensitive"
				},
				category_name: this.query?.categoryName,
				quantity: {gt: this.query?.includeSoldOut ? -1 : 0},
			}
		}).catch(err => {
			this.errors.push("Erro ao tentar encontrar os produtos")
		})

		if(this.errors.length > 0) return
		this.response = products
	}  

	async getProduct(){
		if(!this.query?.productId) return this.errors.push("ID do produto não recebido")

		const product = await this.prisma.product.findUnique({
			where: {
				id: this.query.productId
			}
		}).catch(err => this.errors.push("Não foi possível obter o produto"))

		if(this.errors.length > 0) return
    
		this.response = product
	}

	async createNewProduct(){
		if(!this.body || !this.body.title || !this.body.name || !this.body.quantity || !this.body.description || !this.body.price) return this.errors.push("Existem campos vazios")

		const newProduct = await this.prisma.product.create({
			data: {
				title: this.body.title,
				description: this.body.description,
				img: this.body.img || '',
				name: this.body.name,
				price: Number(this.body.price),
				quantity: Number(this.body.quantity) || 1,
				category_name: this.body?.categoryName || undefined,
			}
		}).catch((error) => this.errors.push('Erro ao criar o produto') && console.log(error))

		if(this.errors.length > 0) return

		this.response = newProduct
	}

	async deleteProduct(){
		if(!this.body) return this.errors.push("Não recebeu nenhuma informação")
		if(!this.body.productId) return this.errors.push("Não recebeu o produto para excluir")
		if(!this.body.userId) return this.errors.push("Você precisa ser um usuário autorizado para excluir um produto")

		const deletedProduct = await this.prisma.product.delete({
			where: {
				id: this.body.productId
			}
		}).catch(() => this.errors.push('Erro ao excluir o produto'))

		if(this.errors.length > 0) return

		this.response = deletedProduct
	}

	async updateProduct(){
		if(!this.body?.userId) return this.errors.push("Você precisa ser um usuário autorizado para atualizar um produto")
		if(!this.body?.productId) return this.errors.push("Não recebeu o produto para atualizar")
		console.log(this.body.title, this.body.description, this.body.name, this.body.price, this.body)
		const updatedProduct = await this.prisma.product.update({
			where: {
				id: this.body.productId
			},
			data:{
				title: this.body?.title,
				description: this.body?.description,
				img: this.body?.img || '',
				name: this.body?.name,
				price: this.body?.price,
				quantity: Number(this.body?.quantity) || undefined,
				category_name: this.body?.categoryName,
			}
		}).catch(() => this.errors.push('Erro ao atualizar o produto'))

		if(this.errors.length > 0) return

		this.response = updatedProduct
	}

	async decreaseProductQuantByOne(){
		if(!this.body || !this.body.productId) return this.errors.push("Informações faltando")
    
		//Até o momento, para a lógica de negócios, deve PERMITIR itens negativos no estoque. 
		const product = await this.prisma.product.update({
			where: {
				id: this.body.productId
			},
			data:{
				quantity: {decrement: 1}
			}
		}).catch(() => this.errors.push('Erro ao diminuir a quantidade do produto'))

		if(this.errors.length > 0) return

		this.response = product
	}

	async increaseProductQuant(){
		if(!this.body || !this.body.productQuantIncrement || !this.body.productId || !this.body.userId) return this.errors.push("Informações faltando")
		if(!(await this.isAuthorized(this.body.userId))) return this.errors.push("Usuário não autorizado")

		const product = await this.prisma.product.update({
			where: {
				id: this.body.productId
			},
			data:{
				quantity: {increment: Number(this.body.productQuantIncrement)}
			}
		}).catch(() => this.errors.push('Erro ao aumentar a quantidade do produto'))

		if(this.errors.length > 0) return

		this.response = product
	}

	private async isAuthorized(userId: string){
		const user = await this.prisma.user.findFirst({where: {id: userId}}).then(res => res).catch(() => {
			this.errors.push("Não foi possível verificar se o usuário está autorizado")
			return null
		})
		if(this.errors.length > 0)
		return false
	}
}

export default Product