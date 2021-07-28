class VoteSerializer {
  static getSummary(vote) {
    const allowedAttributes = ["direction", "userId", "id"]
    
    let serializedVote = {}
    allowedAttributes.forEach(attribute => {
      serializedVote[attribute] = vote[attribute]
    })

    return serializedVote
  }
}

export default VoteSerializer