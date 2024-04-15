import Product, { ProductBodyInterface } from "../../models/Product"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: ProductBodyInterface = await readBody(event)

    if(!body) throw {errors: ['Informações faltando'], statusCode: 400}
    console.log(body)
    const userId = event.context?.userId
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const product = new Product({...body, userId})
    
    return await defaultResponse(product, product.createNewProduct.bind(product), 'product')
  }

  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})