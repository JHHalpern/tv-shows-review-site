import { Review } from "../../models/index.js"

class ReviewsSeeder {
  static async seed() {
    const reviewsData = [
      {
        reviewBody: "I loved this show a lot.  Great details and character development",
        score: 5,
        showId: 1
      },
      {
        reviewBody: "Great show, but Ross is a jerk.",
        score: 4,
        showId: 2
      },
      {
        reviewBody: "The best show on TV as long as you don't watch endings",
        score: 4,
        showId: 3
      }
    ]

    for (const singleReview of reviewsData) {
      const currentReview = await Review.query().findOne(singleReview)
      if (!currentReview) {
        await Review.query().insert(singleReview)
      }
    }
  }
}

export default ReviewsSeeder