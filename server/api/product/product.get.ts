import Product from "../../models/Product"

export default defineEventHandler((event) => {
    const product = new Product(body)
    
  })