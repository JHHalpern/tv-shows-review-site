import { Review } from "../../models/index.js"

class ReviewSeeder {
  static async seed() {
    const reviewData = [
      {
        body: "This show sux, I could make a better show than this one.",
        showId: 1
      },
      {
        body: "I loved this show, I would highly recommend.",
        showId: 2
      },
      {
        body: "This show didn't have nearly enough Nick in it.",
        showId: 3
      },
      {
        body: "This show wasn't even an anime.",
        showId: 1
      }
    ]

    for(const singleReview of reviewData) {
      const currentReview = await Review.query().findOne({ body: singleReview.body })
      if(!currentReview) {
        await Review.query().insert(singleReview)
      }
    }
  }
}

export default ReviewSeeder