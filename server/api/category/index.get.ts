import Category, { CategoryQueryInterface } from "~/server/models/Category"
import Product, { type ProductQueryInterface } from "../../models/Product"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {

  try {
    const query: CategoryQueryInterface & {type: 'getAll' | 'getSingle'} = JSON.parse(String(getQuery(event).data))

    if(!query || !query.type) throw {errors: ['Informações faltando'], statusCode: 400}
    const category = new Category(undefined, query)
    
    if(query.type === 'getAll') return await defaultResponse(category, category.getAllCategories.bind(category), 'category')
    else if(query.type ==='getSingle') return await defaultResponse(category, category.getCategory.bind(category), 'category')
    throw {errors: ['Tipo da operação não informado/reconhecido'], statusCode: 400}
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})