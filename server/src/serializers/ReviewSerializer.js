class ReviewSerializer {
  static getSummary(review) {
    const allowedAttributes = ["body", "score", "id"]

    let serializedReview = {}
    allowedAttributes.forEach(attribute => {
      serializedReview[attribute] = review[attribute]
    })

    return serializedReview
  }
}

export default ReviewSerializer