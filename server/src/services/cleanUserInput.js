const cleanUserInput = formInput => {
  Object.keys(formInput).forEach(field => {
    if(formInput[field] === "") {
      delete formInput[field]
    }
    
    const numberFields = ["score", "showId", "userId", "reviewId"]
    if(numberFields.includes(field) && formInput[field]) {
        const validInput = Number(formInput[field])
        formInput[field] = validInput
    }
  })
  return formInput
}
export default cleanUserInput