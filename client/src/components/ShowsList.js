import React, { useEffect, useState } from "react"

const ShowsList = (props) => {
  const [shows, setShows] = useState([])

  const fetchShows = async () => {
    try{
      const response = await fetch("/api/v1/shows")
      if(!response.ok){
        const errorMessage = `${response.status}: (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      } else {
        const showsData = await response.json()
        setShows(showsData.shows)
      }
    }catch(err){
      console.log(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [])

  return (
    <h1>this is showslist</h1>
  )
}

export default ShowsList