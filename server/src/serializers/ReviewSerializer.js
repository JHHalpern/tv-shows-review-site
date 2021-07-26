import VoteSerializer from "./VoteSerializer.js"

class ReviewSerializer {
  static async getDetail(review) {
    const allowedAttributes = ["body", "score", "id"]

    let serializedReview = {}
    allowedAttributes.forEach(attribute => {
      serializedReview[attribute] = review[attribute]
    })

    const votes = await review.$relatedQuery("votes")
    const serializedVotes = votes.map(vote => {
      return VoteSerializer.getSummary(vote)
    })
    serializedReview.votes = serializedVotes
    
    let upVotes = 0
    let downVotes = 0
  
    serializedReview.votes.forEach(vote => {
      if(vote.direction === "up") {
        upVotes++
      } else {
        downVotes++
      }
    })

    serializedReview.upVotes = upVotes
    serializedReview.downVotes = downVotes

    return serializedReview
  }
}

export default ReviewSerializer