import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NewReviewForm from "./NewReviewForm.js"
import ReviewTile from "./ReviewTile"

const TVDetailsPage = props => {
  const [show, setShow] = useState({
    name: "",
    description: "",
  })
  const [reviews, setReviews] = useState([])
  
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
      setReviews(body.show.reviews)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }
  
  useEffect(() => { 
    getShow()
  }, [])

  const addNewReview = (newReview) => {
    const updatedReviews = [...reviews, newReview]
    setReviews(updatedReviews)
  }

  const addNewVoteToPage = (newVote, reviewId) => {
    // console.log(reviewId)
    const currentReviewIndex = reviews.findIndex((review) => review.id === reviewId)
    console.log(currentReviewIndex)
    let reviewsCopy = [...reviews]
    console.log(reviews)
    console.log(reviewsCopy)
    // console.log(reviewsCopy[currentReviewIndex].votes)
    reviewsCopy[currentReviewIndex].votes = [...reviewsCopy[currentReviewIndex].votes, newVote]
    console.log(reviewsCopy)
    // console.log(reviewsCopy[currentReviewIndex].votes)

    setReviews(reviewsCopy)
  }

  const reviewListItems = reviews.map(review => {
    return (
      <ReviewTile
        key={review.id}
        review={review}
        userId={props.userId}
        addNewVoteToPage={addNewVoteToPage}
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
      {reviewListItems}
    </div>
  )
}

export default TVDetailsPage