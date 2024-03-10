import WishList, {WishListBodyInterface} from "../../models/Wishlist"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: WishListBodyInterface & {type: 'product' | 'deleteAll'} = await readBody(event)
    if(!body || !body.type) throw {errors: ['informações não recebidas']}
    const wishList = new WishList(body)
  
    if(body.type === 'product') return await defaultResponse(wishList, wishList.removeFromWishList.bind(wishList), 'product')
		if(body.type === 'deleteAll') return await defaultResponse(wishList,  wishList.removeAllFromWishList.bind(wishList), 'product')
  })