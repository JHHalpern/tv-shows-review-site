const cleanVoteInput = formInput => {
  Object.keys(formInput).forEach(field => {
    console.log(field)
    
    if(field === "userId") {
        const validId = Number(formInput.userId)
        formInput.userId = validId
    }

    if(field === "reviewId") {
        const validId = Number(formInput.reviewId)
        formInput.reviewId = validId
    }
  })

  return formInput
}

export default cleanVoteInput