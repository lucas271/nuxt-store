import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: CartBodyInterface & {type: "deleteProductFromCart" | 'deleteCart'} = await readBody(event)
    if(!body || !body.type) throw {errors: ['Informações faltando']}
    const cart = new Cart(body)
    
    if(body.type === "deleteProductFromCart") return await defaultResponse(cart, cart.deleteProductFromCart.bind(cart), 'cart')
		else if(body.type === 'deleteCart') return await defaultResponse(cart, cart.deleteCart.bind(cart), 'cart')
  })