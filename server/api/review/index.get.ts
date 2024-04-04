import Review, {type ReviewQueryInterface} from "../../models/Review"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  try {
    const query: ReviewQueryInterface & {type: 'product' | 'products'} = JSON.parse(String(getQuery(event).data))
    if(!query) throw {errors: ['Informações faltando'], statusCode: 400}
    const review = new Review(undefined, query)

    return await defaultResponse(review, review.getReviews.bind(review), 'review')
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      message: JSON.stringify({errors: error?.errors || ["erro no servidor"]}),
    })
  }
})