import React, { useState, useEffect } from "react"
import NewReviewForm from "./NewReviewForm.js"
import ReviewTile from "./ReviewTile"

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
    setShow(updatedShow)
  }
  
  const reviewListItems = show.reviews.map(reviewItem => {
    return (
      <ReviewTile
        key={reviewItem.id}
        body={reviewItem.body}
        score={reviewItem.score}
        votes={reviewItem.votes}
      />
    )
  })
 
  return(
    <div className="callout primary">
      <div className="callout">
        <h1>{show.name}</h1>
        <h4>Description: </h4>
        {show.description}
      </div>
      <NewReviewForm showId={showId} addNewReview={addNewReview}/>
      <h4>Reviews: </h4>
      {reviewListItems}
    </div>
  )
}

export default TVDetailsPage