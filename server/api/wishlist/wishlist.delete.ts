import WishList, {WishListBodyInterface} from "../../models/Wishlist"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler((event) => {
    const body: WishListBodyInterface = useBody(event)
    if(!body || !body.type) throw {errors: ['informações não recebidas']}
    const wishList = new WishList(body)
  
    if(body.type === 'product') return await boilerPlateResponse(wishList, wishList.removeFromWishList.bind(wishList), 'product')
		if(body.type === 'deleteAll') return await boilerPlateResponse(wishList,  wishList.removeAllFromWishList.bind(wishList), 'product')
  })