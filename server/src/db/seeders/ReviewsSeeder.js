import { Review } from "../../models/index.js"

class ReviewsSeeder {
  static async seed() {
    const reviewsData = [
      {
        body: "I loved this show a lot.  Great details and character development",
        score: 5,
        showId: 1,
        userId: 1,
      },

      {
        body: "My favorite evening program",
        score: 5,
        showId: 2,
        userId: 1,
      },
      {
        body: "They ask the question and give the answer in reverse...",
        score: 1,
        showId: 2,
        userId: 1,
      },
      {
        body: "I learn so much from this show!",
        score: 5,
        showId: 2,
        userId: 1,
      },

      {
        body: "Great show, but Ross is a jerk.",
        score: 4,
        showId: 3,
        userId: 1,
      },

      {
        body: "The best show on TV as long as you don't watch endings",
        score: 4,
        showId: 4,
        userId: 2,
      },
      {
        body: "Heartbreaking; bittersweet",
        score: 4,
        showId: 4,
        userId: 3,
      },
      {
        body: "I was rooting for the Night King",
        score: 2,
        showId: 4,
        userId: 1,
      },

      {
        body: "Gordan Ramsey is a boss",
        score: 5,
        showId: 5,
        userId: 1,
      },
      {
        body: "The show host is very mean and is constantly yelling",
        score: 1,
        showId: 5,
        userId: 1,
      },
      {
        body: "Yes chef...",
        score: 3,
        showId: 5,
        userId: 1,
      },
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
