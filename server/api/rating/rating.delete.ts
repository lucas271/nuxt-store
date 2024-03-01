import Rating from "../../models/Rating"

export default defineEventHandler((event) => {
    const rating = new Rating(body)
    
  })