import Rating from "../../models/Rating"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {

  try {
    const productId: string = JSON.parse(String(getQuery(event).data))
    if(!productId) throw {errors: ['Informações faltando'], statusCode: 400}
  
  
    const rating = new Rating(undefined, {productId})
    return await defaultResponse(rating, rating.getRatings.bind(rating), 'rating')
  } 
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
  
})