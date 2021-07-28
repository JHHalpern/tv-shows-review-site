const editVote = async (vote) => {
  let newDirection
  if(vote.direction === "up") {
    newDirection = "down"
  } else {
    newDirection = "up"
  }
  vote.direction = newDirection
  try {
    const response = await fetch("/api/v1/votes", {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(vote)
    })
  } catch(err) {
    console.log(`Error in fetch: ${err.message}`)
  }
}

export default editVote