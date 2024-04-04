import Rating, { RatingBodyInterface } from "../../models/Rating"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: RatingBodyInterface = await readBody(event)    
    if(!body) throw {errors: ['Informações faltando'], statusCode: 400}

    const userId = event.context?.userId
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const rating = new Rating({...body, userId})
    
		return await defaultResponse(rating, rating.updateRating.bind(rating), 'rating')
  }

  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
  
})