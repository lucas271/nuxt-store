import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
//userId === cartId in the db
export interface CartBodyInterface{
    productId?: string,
    userId: string,
    increment?: number,
}

class Cart{
	public body: CartBodyInterface
	public errors: String[]
	public response: any
	public prisma: typeof prisma
  
	constructor(body: CartBodyInterface){
		this.body = body
		this.errors = []
		this.response = null
		this.prisma = prisma
	}

	async getCart(){
		if(!this.body.userId) return this.errors.push("	Id do cart não recebido")
		const cart = await this.prisma.cart.findUnique({
			where:{
				id: this.body.userId
			},
			select: {
				products : true,
				id: true
			}
		}).catch((err) => {
			this.errors.push('nao foi possivel achar o produto')
			return null
		})


		if(this.errors.length > 0) return
		if(!cart) return this.response = []

		const productsInCart = await this.prisma.cartItem.findMany({where: {
			cart_id: cart.id,
			product_id: {
				in: cart.products.map(product => product.product_id)
        
			}
		}, select:{
			product: true,
			quantity: true,
		}}).catch((err) =>{
			this.errors.push("Error getting product info") 
			return []
		})
		if(this.errors.length > 0) return
		if(productsInCart?.length < 1) return this.response = []
		this.response = productsInCart
	}

	async addProduct(){
		const cart = await this.handleCart()
		if(this.errors.length > 0) return
		this.body.userId = cart?.id || this.body.userId
		if(!this.body.userId || !this.body.productId) return this.errors.push("o id do produto ou o id do usuario não foi recebido")


		const existingCartItem = await this.prisma.cartItem.findFirst({
			where: {
				product_id: this.body.productId,
				cart_id: this.body.userId,
			},
		});
		if (existingCartItem) {
			// Item already exists, update the quantity
			const cartItem = await this.prisma.cartItem.update({
				where: {
					id: existingCartItem.id,
				},
				data: {
					quantity: existingCartItem.quantity + (this.body?.increment || 1),
				},         
				select: {
					product: true,
					quantity: true,
					product_id: true,
				}
			}).catch((err) => this.errors.push('Não foi possivel adicionar o novo item') && console.log(err));
			if(this.errors.length > 0) return
			this.response = cartItem
		} else {
			// Item doesn't exist, create a new entry
			const cartItem = await this.prisma.cartItem.create({
				data: {
					product_id: this.body.productId,
					cart_id: this.body.userId,
					quantity: 1,
				},
				select: {
					product: true,
					quantity: true,
					product_id: true,
				}
			}).catch((err) => this.errors.push('não foi possivel adicionar o novo item'));
			if(this.errors.length > 0) return

			this.response = cartItem
		}
	}

	async deleteSingleProductFromCart(){
		const product = await this.prisma.cartItem.findFirst({
			where: {
				cart_id:this.body.userId,
				product_id:this.body.productId
			}
		})

    
		if(product && product.quantity > 1){
			const deleteSingleProduct = await this.prisma.cartItem.update({
				where: {
					id: product.id
				},
				data:{
					quantity: {decrement: 1}
				},
				select: {
					product: true,
					quantity: true,
					product_id: true
				}
			}).then(res => res).catch(() => this.errors.push('nao foi possivel deletar o item'))

			if(this.errors.length > 0) return
			this.response = deleteSingleProduct
		}
		else{
			await this.deleteProductFromCart()
		}
 
	}

	async deleteCart(){
		const productInCart = await this.prisma.cartItem.findFirst({
			where: {
				cart_id:this.body.userId,
				product_id:this.body.productId
			},
			select: {id: true}
		}).catch(err => {
			console.log(err)
			this.errors.push('não foi possivel encontrar o usuario')
			return
		})
		await this.prisma.cartItem.delete({
			where: {
				id: productInCart?.id
			}
		}).then(res => res).catch(err => {
			this.errors.push("não foi possivel deletar o carrinho")})

		if(this.errors.length > 0) return

		this.response = productInCart
	}

	async deleteProductFromCart(){
		const productInCart = await this.prisma.cartItem.findFirst({
			where: {
				cart_id:this.body.userId,
				product_id:this.body.productId
			},
			select: {id: true}
		}).catch(err => {
			console.log(err)
			this.errors.push('nao foi possivel encontrar o usuario')
			return
		})

		const deleteProduct = await this.prisma.cartItem.delete({
			where: {
				id: productInCart?.id
			},
			select: {
				product: true,
				quantity: true,
				product_id: true
			}
		}).catch(err => this.errors.push("nao foi possivel deletar o produto"))

		if(this.errors.length > 0) return
		this.response = deleteProduct
	}

  

	//check if cart exists, if it does not exist create it.
	async handleCart(){
		let cart = await this.prisma.cart.findUnique({
			where:{
				id: this.body.userId
			}
		}).catch(() => {
			this.errors.push('Erro tentando encontrar o carrinho')
			return null
		})
		if(cart) {
			this.response = cart
			return cart
		}
		if(!this.body.userId){
			this.errors.push("id do usuario não recebido") 
			return null    
		}
		if(this.errors.length > 0) return null
		cart = await this.prisma.cart.create({data: {id: this.body.userId, status: 'PENDING'}}).then((res) => res).catch((err) => {
			this.errors.push('nao foi possivel criar o carrinho')
			return null
		})
		if(this.errors.length > 0) return null
		this.response = cart
		return cart
	}
}

export default Cart