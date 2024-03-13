import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: CartBodyInterface & {type: 'deleteSingleProductFromcart' | 'addProduct'} = await readBody(event)
		
    if(!body || !body.type) throw {errors: ['Informações faltando']}
    const cart = new Cart(body)

		if(body.type === 'deleteSingleProductFromcart') return await defaultResponse(cart, cart.deleteSingleProductFromCart.bind(cart), 'cart')
		else if(body.type === 'addProduct') return await defaultResponse(cart, cart.addProduct.bind(cart), 'cart')
  })