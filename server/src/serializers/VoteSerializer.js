class VoteSerializer {
  static getSummary(vote) {
    const allowedAttributes = ["direction", "userId", "id", "reviewId"]
    
    let serializedVote = {}
    allowedAttributes.forEach(attribute => {
      serializedVote[attribute] = vote[attribute]
    })

    return serializedVote
  }
}

export default VoteSerializer