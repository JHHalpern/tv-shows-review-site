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
  
  const { id } = useParams()
  
  const getShow = async () => {
    try {
      const response = await fetch(`/api/v1/shows/${id}`)
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

  const addNewVote = (newVote, reviewId) => {
    const currentReviewIndex = show.reviews.findIndex((review) => review.id === reviewId)
    let reviewsCopy = [...show.reviews]
    reviewsCopy[currentReviewIndex].votes = [...reviewsCopy[currentReviewIndex].votes, newVote]
    setShow({
      ...show,
      reviews: reviewsCopy
    })
  }

  let loggedInError
  if(!props.userId) {
    loggedInError = <p>You must log in to vote on reviews!</p>
  }

  const reviewListItems = show.reviews.map(reviewItem => {
    return (
      <ReviewTile
        key={reviewItem.id}
        reviewId={reviewItem.id}
        body={reviewItem.body}
        score={reviewItem.score}
        votes={reviewItem.votes}
        userId={props.userId}
        addNewVote={addNewVote}
      />
    )
  })
 
  return(
    <div>
      <h1>{show.name}</h1>
      <h4>Description: </h4>
      {show.description}
      <NewReviewForm 
        showId={id} 
        addNewReview={addNewReview} 
      />
      <h4>Reviews: </h4>
      {loggedInError}
      {reviewListItems}
    </div>
  )
}

export default TVDetailsPage