import Category, { CategoryBodyInterface } from "~/server/models/Category"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: CategoryBodyInterface = await readBody(event)
    console.log(body)
    if(!body) throw {errors: ['Informações faltando']}

    const category = new Category(body)
    
    return await defaultResponse(category, category.newCategory.bind(category), 'category')
  })