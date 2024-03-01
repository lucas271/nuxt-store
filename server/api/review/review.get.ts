import Review, {ReviewQueryInterface} from "../../models/Review"

export default defineEventHandler((event) => {
    const body: ReviewQueryInterface = useBody(event)

    const review = new Review(body)
    
  })