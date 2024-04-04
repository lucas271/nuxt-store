import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: CartBodyInterface & {type: "deleteProductFromCart" | 'deleteCart'} = await readBody(event)
    if(!body || !body.type) throw {errors: ['Informações faltando'], statusCode: 400}
    const cart = new Cart(body)
    
    if(body.type === "deleteProductFromCart") return await defaultResponse(cart, cart.deleteProductFromCart.bind(cart), 'cart')
    else if(body.type === 'deleteCart') return await defaultResponse(cart, cart.deleteCart.bind(cart), 'cart')
  }

  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})