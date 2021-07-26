import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import NewReviewForm from "./NewReviewForm.js"
import ReviewTile from "./ReviewTile"

const TVDetailsPage = props => {
  const [show, setShow] = useState({
    name: "",
    description: "",
    reviews: []
  })

  const showId = useParams().id
  
  const getShow = async () => {
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
  
  const addNewReview = (review) => {
    const updatedShow = {
      ...show,
      reviews: [...show.reviews, review]
    }
    setShow({ name: updatedShow.name, description: updatedShow.description, reviews: updatedShow.reviews })
  }
  
  const userId = props.userId

  const reviewListItems = show.reviews.map(reviewItem => {
    return (
      <ReviewTile
        key={reviewItem.id}
        review={reviewItem}
        addNewReview={addNewReview}
        userId={userId}
        getShow={getShow}
      />
    )
  })
 
  return(
    <div>
      <h1>{show.name}</h1>
      <h4>Description: </h4>
      {show.description}

      <NewReviewForm
        showId={showId}
        addNewReview={addNewReview}
        userId={userId}
      />

      <h4>Reviews: </h4>
      {reviewListItems}
    </div>
  )
}

export default TVDetailsPage