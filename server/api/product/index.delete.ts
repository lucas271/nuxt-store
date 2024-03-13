import Product from "../../models/Product"
import defaultResponse from "../util/defaultResponse";


export default defineEventHandler(async (event) => {
  const body: {userId: string, productId: string} = await readBody(event)
  if(!body) throw {errors: ['Informações faltando']}

  const product = new Product(body)
  return await defaultResponse(product, product.deleteProduct.bind(product), 'product')
  
})

