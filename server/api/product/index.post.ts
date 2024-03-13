import Product, { ProductBodyInterface } from "../../models/Product"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: ProductBodyInterface = await readBody(event)
    if(!body) throw {errors: ['Informações faltando']}

    const product = new Product(body)
    
    return await defaultResponse(product, product.createNewProduct.bind(product), 'product')
  })