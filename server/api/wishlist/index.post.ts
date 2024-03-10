import WishList, {WishListBodyInterface} from "../../models/Wishlist"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: WishListBodyInterface = await readBody(event)
    if(!body) throw {errors: ['informações não recebidas']}
    const wishList = new WishList(body)
  
		return await defaultResponse(wishList, wishList.addToWishList.bind(wishList), 'product')
  })