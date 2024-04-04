import Review, {ReviewBodyInterface} from "../../models/Review"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try{
    const body: ReviewBodyInterface = await readBody(event)
    if(!body) throw {errors: ['Informações faltando'], statusCode:400}
  
  
    const userId = event.context?.userId
    if(!userId) throw {errors: ['Informações faltando'], statusCode: 400}
    const review = new Review({...body, userId})
      
    return await defaultResponse(review, review.createNewReview.bind(review), 'review')  
  }
  catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})