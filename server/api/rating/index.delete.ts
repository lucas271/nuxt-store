import Rating, { RatingBodyInterface } from "../../models/Rating"
import defaultResponse from "../util/defaultResponse"

export default defineEventHandler(async (event) => {
  const body: RatingBodyInterface = await readBody(event)    
  if(!body) throw {errors: ['Informações faltando']}

  const rating = new Rating(body)

  return await defaultResponse(rating, rating.deleteRating.bind(rating), 'rating')
})  