import Product, { type ProductQueryInterface } from "../../models/Product"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try {
    const query: ProductQueryInterface & {type: 'product' | 'products'} = JSON.parse(String(getQuery(event).data))
    if(!query || !query.type) throw {errors: ['Informações faltando'], statusCode: 400}
    const product = new Product(query)
    
    if(query.type === 'product') return await defaultResponse(product, product.getProduct.bind(product), 'product')
    else if(query.type ==='products') return await defaultResponse(product, product.getProducts.bind(product), 'product')
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }

})