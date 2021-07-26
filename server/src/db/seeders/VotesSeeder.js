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
        direction: "down",
        userId: 1,
        reviewId: 2,
      },
      {
        direction: "up",
        userId: 2,
        reviewId: 1
      }
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