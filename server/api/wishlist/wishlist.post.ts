import WishList from "../../models/Wishlist"

export default defineEventHandler((event) => {
    const wishList = new WishList(body)
    
  })