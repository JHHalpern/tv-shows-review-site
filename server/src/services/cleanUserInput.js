const cleanUserInput = formInput => {
  Object.keys(formInput).forEach(field => {
    if(formInput[field] === "") {
      delete formInput[field]
    }
    
    if(field === "score" && formInput[field]) {
        const validScore = Number(formInput.score)
        formInput.score = validScore
    }

    if(field === "showId") {
        const validShowId = Number(formInput.showId)
        formInput.showId = validShowId
    }

    if(field === "userId") {
        const validUserId = Number(formInput.userId)
        formInput.userId = validUserId
    }

    if(field === "reviewId") {
        const validReviewId = Number(formInput.reviewId)
        formInput.reviewId = validReviewId
    }
  })

  return formInput
}

export default cleanUserInput