import Cart from "../../models/Cart"

export default defineEventHandler((event) => {
    const cart = new Cart(body)
    
  })