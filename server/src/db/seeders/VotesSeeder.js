import { Vote } from "../../models/index.js"

class VotesSeeder {
  static async seed() {
    const votesData = [
      {
        direction: "up",
        userId: 1,
        reviewId: 1
      },
      {
        direction: "up",
        userId: 2,
        reviewId: 1
      },
      {
        direction: "up",
        userId: 3,
        reviewId: 1
      },
      {
        direction: "up",
        userId: 1,
        reviewId: 2
      },
      {
        direction: "down",
        userId: 2,
        reviewId: 2
      },
      {
        direction: "up",
        userId: 3,
        reviewId: 2
      },
      {
        direction: "up",
        userId: 1,
        reviewId: 3
      },
      {
        direction: "up",
        userId: 3,
        reviewId: 3
      },
      {
        direction: "up",
        userId: 1,
        reviewId: 5
      },
      {
        direction: "down",
        userId: 1,
        reviewId: 5
      },
      {
        direction: "up",
        userId: 1,
        reviewId: 6
      },
      {
        direction: "up",
        userId: 2,
        reviewId: 6
      },
      {
        direction: "up",
        userId: 3,
        reviewId: 6
      },
      {
        direction: "down",
        userId: 3,
        reviewId: 8
      },
      {
        direction: "down",
        userId: 1,
        reviewId: 8
      },
      {
        direction: "down",
        userId: 2,
        reviewId: 8
      },
    ]

    for (const singleVoteData of votesData) {
      const currentVote = await Vote.query().findOne(singleVoteData)
      if (!currentVote) {
        await Vote.query().insert(singleVoteData)
      }
    }
  }
}

export default VotesSeeder
