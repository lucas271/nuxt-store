import Cart, { CartBodyInterface } from "../../models/Cart"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    try {
      console.log('A')
      const userId = event.context?.userId
      if(!userId) throw {errors: ['Não foi possivel encontrar as informações do usuário'], statusCode: 400}
      const cart = new Cart({userId})
      return await defaultResponse(cart, cart.getCart.bind(cart), 'cart')
    } catch (error: any) {
      throw createError({
        statusCode: error?.statusCode || 500,
        message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
      })
    }
  })