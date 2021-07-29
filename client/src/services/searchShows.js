const searchShows = async (searchQuery) => {
  try{
    const response = await fetch(`/api/v1/search/${searchQuery}`)
    if(!response.ok){
      const errorMessage = `${response.status}: (${response.statusText})`
      const error = new Error(errorMessage)
      throw(error)
    } else {
      const searchedShowsData = await response.json()
      return searchedShowsData.shows
    }
  } catch(err) {
    console.log(`Error in Fetch: ${err.message}`)
  }
}

export default searchShows