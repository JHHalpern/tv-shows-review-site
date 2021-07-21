import React, { useState, useEffect } from "react"
import NewReviewForm from "./NewReviewForm.js"
import ReactTile from "./ReviewTiles.js"

const TVDetailsPage = props => {
  const [show, setShow] = useState({
    name: "",
    description: "",
    reviews: []
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

  const reviewsListItems = show.reviews.map(reviewObject => {
    return(
      <ReactTile key={reviewObject.id} review={reviewObject.body} />
    )
  })

  const addNewReview = (review) => {
    console.log(review)
    let updatedShow = show
    updatedShow.reviews.concat(review)
    setShow(updatedShow)
  }

  return(
    <div>
      <h1>{show.name}</h1>
      <h4>Description:</h4>
        {show.description}
      <NewReviewForm showId={showId} addNewReview={addNewReview} />
      <ul>
        {reviewsListItems}
      </ul>
    </div>
  )
}

export default TVDetailsPage