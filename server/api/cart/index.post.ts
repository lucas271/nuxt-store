import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  const body: CartBodyInterface = await readBody(event)
		
  if(!body) throw {errors: ['Informações faltando']}
  const cart = new Cart(body)
  
  return await defaultResponse(cart, cart.handleCart.bind(cart), 'cart')
})