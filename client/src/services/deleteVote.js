const deleteVote = async (voteId) => {
  try{
    const response = await fetch(`/api/v1/votes/${voteId}`, {
      method: "DELETE"
    })
  } catch(err) {
    console.log(`Error in fetch: ${err.message}`)
  }
}

export default deleteVote