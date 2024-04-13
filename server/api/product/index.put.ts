import Product, { ProductBodyInterface } from "../../models/Product"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: ProductBodyInterface & {type: 'updateProduct' | 'increaseProductQuant' | 'decreaseProductQuantByOne'}= await readBody(event)
    if(!body || !body.type) throw {errors: ['Informações faltando'], statusCode: 400}
    const userId = event.context?.userId
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const product = new Product({...body, userId})

		if(body.type === 'updateProduct') return await defaultResponse(product, product.updateProduct.bind(product), 'product')
		else if(body.type === 'increaseProductQuant') return await defaultResponse(product, product.increaseProductQuant.bind(product), 'product')
		else if(body.type === 'decreaseProductQuantByOne') return await defaultResponse(product, product.decreaseProductQuantByOne.bind(product), 'product')
  }

  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})