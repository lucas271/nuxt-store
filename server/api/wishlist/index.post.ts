import WishList, {WishListBodyInterface} from "../../models/Wishlist"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: WishListBodyInterface = await readBody(event)
    if(!body) throw {errors: ['informações não recebidas'], statusCode: 400}
    const userId = event.context?.userId
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const wishList = new WishList({...body, userId})

		return await defaultResponse(wishList, wishList.addToWishList.bind(wishList), 'wishList')
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})