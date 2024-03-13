import Product, { ProductBodyInterface } from "../../models/Product"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: ProductBodyInterface & {type: 'updateProduct' | 'increaseProductQuant' | 'decreaseProductQuantByOne'}= await readBody(event)
    if(!body || !body.type) throw {errors: ['Informações faltando']}
    const product = new Product(body)

		if(body.type === 'updateProduct') return await defaultResponse(product, product.updateProduct.bind(product), 'product')
		else if(body.type === 'increaseProductQuant') return await defaultResponse(product, product.increaseProductQuant.bind(product), 'product')
		else if(body.type === 'decreaseProductQuantByOne') return await defaultResponse(product, product.decreaseProductQuantByOne.bind(product), 'product')
  })