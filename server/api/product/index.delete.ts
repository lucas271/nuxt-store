import Product from "../../models/Product"
import defaultResponse from "../util/defaultResponse";


export default defineEventHandler(async (event) => {
  try{
    const body: {userId: string, productId: string} = await readBody(event)
    const userId = event.context?.userId
    
    if(!body || !userId) throw {errors: ['Informações faltando'], statusCode: 400}
  
    const product = new Product({...body, userId})
    return await defaultResponse(product, product.deleteProduct.bind(product), 'product')  
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})

