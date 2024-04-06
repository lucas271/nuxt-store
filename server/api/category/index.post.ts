import Category, { CategoryBodyInterface } from "~/server/models/Category"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: CategoryBodyInterface = await readBody(event)
    console.log(body)
    if(!body) throw {errors: ['Informações faltando'], statusCode: 400}
    const userId = event.context?.userId
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const category = new Category({...body, userId})
    
    return await defaultResponse(category, category.newCategory.bind(category), 'category')
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})