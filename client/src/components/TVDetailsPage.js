import React, { useState, useEffect } from "react"

const TVDetailsPage = props => {
  const [show, setShow] = useState({
    name: "",
    description: ""
  })

  const showId = props.match.params.id

  const getShow = async () => {
    try {
      const response = await fetch(`/api/v1/shows/${showId}`)
      if(!response.ok){
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      setShow(body.show)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  useEffect(() => { 
    getShow()
  }, [])

  return(
    <div>
      <h1>{show.name}</h1>
      <h4>Description:</h4>
        {show.description}
    </div>
  )
}

export default TVDetailsPage