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
        const validId = Number(formInput.showId)
        formInput.showId = validId
    }

    if(field === "userId" || field === "reviewId") {
        const validId = Number(formInput[field])
        formInput[field] = validId
    }

    // if(field === "reviewId") {
    //     const validId = Number(formInput.showId)
    //     formInput.showId = validId
    // }

  })

  return formInput
}

export default cleanUserInput