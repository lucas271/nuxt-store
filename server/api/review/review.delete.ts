import Review, {ReviewQueryBody} from "../../models/Review"

export default defineEventHandler((event) => {
    const body: ReviewQueryBody = useBody(event)

    const review = new Review(body)
    
  })