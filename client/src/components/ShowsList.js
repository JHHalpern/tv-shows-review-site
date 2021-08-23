import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ShowTile from "./ShowTile.js"
import searchShows from "../services/searchShows.js"

const ShowsList = (props) => {
  const [shows, setShows] = useState([])
  const [searchedShows, setSearchedShows] = useState([])
  const [searchData, setSearchData] = useState("")

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

  let showList = searchedShows.map( show => {
    return (
      <ShowTile
        key={show.id}
        id={show.id}
        name={show.name}
        description={show.description}
      />
    )
  })

  if(showList.length === 0) {
    showList = (
      <div className="search_error">
        <p>No matching results found!</p>
      </div>
    )
  }

  const handleChange = (event) => {
    setSearchData(event.currentTarget.value)
  }

  const handleSearch = async (searchData) => {
    const searchResults = await searchShows(searchData)
    setSearchedShows(searchResults)
  }

  useEffect(() => {
    handleSearch(searchData)
  }, [searchData])


  return (
    <div className="callout primary">
      <h1>TV Shows</h1>
      <div>
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchData}
          onChange={handleChange}
        ></input>
      </div>
      <div id="shows">
        {showList}
      </div>
      <Link to="/shows/new"><button className="button">Add A New Show!</button></Link>
    </div>
  )
}

export default ShowsList
