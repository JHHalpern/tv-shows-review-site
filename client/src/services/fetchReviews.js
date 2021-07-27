const fetchReviews = async (showId) => {
  try {
    const response = await fetch(`/api/v1/shows/${showId}/reviews`)
    const body = await response.json()
    return body.reviews
  } catch(err) {
    console.log(`Error in fetch: ${err.message}`)
  }
}

export default fetchReviews