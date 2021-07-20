import React, { useState, useEffect } from "react"

const TvShowPage = props => {
  const [shows, setShows] = useState({
    name: "",
    actors: []
  })
  const [errors, setErrors] = useState([])

  const showId = props.match.params.id

  const getShows = async () => {
    try{
      const response = await fetch(`/api/v1/shows/${showId}`)
      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      setShows(body.shows)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  useEffect(() => {
    getShows()
  }, [])

  const postShow = async (newShowData) => {
    try{
      const response = await fetch(`/api/v1/shows/${showId}/info`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json" 
        }),
        body: JSON.stringify(newShowData)
      })
      if(!response.ok){
        if(response.status === 422){
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      }else {
        const body = await response.json()
        const updatedActors = shows.concat(body.actors)
        setErrors([])
        setShows({...shows, actors: updatedActors})
      }
    } catch(error){
      console.error(`Error in fetch: ${erros.message}`)
    }
  }

  const showTiles = actors.shows.map(showObject => {
    return(
      <ShowTile
      key={showObject.id}
      {...showObject}
      />
    )
  })
  return(
    <div>
      <h1>{shows.name}</h1>
      <h4>Actors:</h4>
      {actorTile}
      <div>
        <ErrorList errors={errors}/>
        <NewShowForm
        postShow={postShow}
        />
      </div>
    </div>
  )
}

export default TvShowPage