import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: CartBodyInterface = await readBody(event)
		
    if(!body) throw {errors: ['Informações faltando'], statusCode: 400}
    const userId = event.context?.userId
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const cart = new Cart({...body, userId})    
    return await defaultResponse(cart, cart.handleCart.bind(cart), 'cart')
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})