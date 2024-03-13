import Review, {ReviewBodyInterface} from "../../models/Review"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
    const body: ReviewBodyInterface = await readBody(event)
    if(!body) throw {errors: ['Informações faltando']}


    const review = new Review(body)
		return await defaultResponse(review, review.createNewReview.bind(review), 'review')
  })