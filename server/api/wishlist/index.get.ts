import WishList, {WishListQueryInterface} from "../../models/Wishlist"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try {
    const query: WishListQueryInterface & {type: 'items' | 'item'} = JSON.parse(String(getQuery(event).data))
    const userId = event.context?.userId
    console.log(userId, query, !query || !query.type || !userId)
    if(!query || !query.type || !userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const wishList = new WishList(undefined, {...query, userId})

    if(query.type === 'item') return await defaultResponse(wishList, wishList.getWishListItem.bind(wishList), 'wishList')
    else if(query.type ==='items') return await defaultResponse(wishList, wishList.getWishListItems.bind(wishList), 'wishList')
  }catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})