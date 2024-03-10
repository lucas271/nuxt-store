import Category, { CategoryBodyInterface } from "~/server/models/Category";
import Product from "../../models/Product"
import defaultResponse from "../util/defaultResponse";


export default defineEventHandler(async (event) => {
  const body: CategoryBodyInterface = await readBody(event)
  if(!body) throw {errors: ['Informações faltando']}

  const category = new Category(body)
  return await defaultResponse(category, category.deleteCategory.bind(category), 'product')
  
})

