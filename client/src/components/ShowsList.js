import React, { useEffect, useState } from "react"
import ShowTile from "./ShowTile.js"

const ShowsList = (props) => {
  const [shows, setShows] = useState([])

  const fetchShows = async () => {
    try {
      const response = await fetch("/api/v1/shows")
      if(!response.ok){
        const errorMessage = `${response.status}: (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      } else {
        const showsData = await response.json()
        setShows(showsData.shows)
      }
    } catch(err) {
      console.log(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [])

  const showList = shows.map( show => {
    return (
      <ShowTile
        key={show.id}
        id={show.id}
        name={show.name}
        description={show.description}
      />
    )
  })

  return (
    <div className="callout primary">
      <h1>TV Shows</h1>
      <div id="shows">
        {showList}
      </div>
    </div>
  )
}

export default ShowsList