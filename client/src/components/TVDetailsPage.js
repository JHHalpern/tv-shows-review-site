import React, { useState, useEffect } from "react"
import ReviewTile from "./ReviewTile"

const TVDetailsPage = props => {
  const [show, setShow] = useState({
    name: "",
    description: "",
    reviews: []
  })

  const getShow = async () => {
    const showId = props.match.params.id
    try {
      const response = await fetch(`/api/v1/shows/${showId}`)
      if(!response.ok) {
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

  const reviewListItems = show.reviews.map(reviewItem => {
    return (
      <ReviewTile
        key={reviewItem.id}
        reviewBody={reviewItem.reviewBody}
        score={reviewItem.score}
      />
    )
  })
 
  return(
    <div>
      <h1>{show.name}</h1>
      <h4>Description: </h4>r
      {show.description}
      <h4>Reviews: </h4>
      {reviewListItems}
    </div>
  )
}

export default TVDetailsPage