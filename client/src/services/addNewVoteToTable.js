const addNewVoteToTable = async (userId, direction, reviewId) => {
  try {
    const response = await fetch(`/api/v1/reviews/${reviewId}/vote`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({ userId, direction })
    })
    if(!response.ok){
      const errorMessage = `${response.status}: (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    } else {
      const body = await response.json()
      return body.newVote
    }
  } catch(err) {
    console.error(`Error in fetch: ${err.message}`)
  }
}

export default addNewVoteToTable