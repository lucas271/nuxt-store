import Review from "../../models/Review"

export default defineEventHandler((event) => {
    const review = new Review(body)
    
  })