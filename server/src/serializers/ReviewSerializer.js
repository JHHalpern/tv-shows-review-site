class ReviewSerializer {
  static getSummary(review) {
    const allowedAttributes = ["reviewBody", "score", "id"]

    let serializedReview = {}
    allowedAttributes.forEach(attribute => {
      serializedReview[attribute] = review[attribute]
    })

    return serializedReview
  }
}

export default ReviewSerializer