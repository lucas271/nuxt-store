import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: CartBodyInterface & {type: 'deleteSingleProductFromcart' | 'addProduct'} = await readBody(event)
		
    if(!body || !body.type) throw {errors: ['Informações faltando'], statusCode: 400}
    const userId = event.context?.userId
    
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const cart = new Cart({...body, userId})

		if(body.type === 'deleteSingleProductFromcart') return await defaultResponse(cart, cart.deleteSingleProductFromCart.bind(cart), 'cart')
		else if(body.type === 'addProduct') return await defaultResponse(cart, cart.addProduct.bind(cart), 'cart')
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})