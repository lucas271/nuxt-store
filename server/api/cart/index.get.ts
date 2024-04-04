import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    try {
      const query: CartBodyInterface = JSON.parse(String(getQuery(event).data))
      console.log(query)
      if(!query) throw {errors: ['Informações faltando'], statusCode: 400}
  
      const cart = new Cart(query)
      
      return await defaultResponse(cart, cart.getCart.bind(cart), 'cart')
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
      })
    }
  })