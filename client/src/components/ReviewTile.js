import React, { useState, useEffect } from "react"

import NewReviewForm from "./NewReviewForm.js"
import EditReviewForm from "./EditReviewForm.js"
import ReviewDisplay from "./ReviewDisplay.js"

const ReviewTile = (props) => {
  const review = props.review

  let upVotes = 0
  let downVotes = 0

  const reviewId = review.id
  const showId = review.showId
 
  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}`, {
        method: "DELETE"
      })
      props.handleDelete(reviewId)
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const [canEdit, setCanEdit] = useState(false)

  const handleEdit = (event) => {
    event.preventDefault()
    setCanEdit(!canEdit)
  }

  if(props.userId === review.userId) {
    if(canEdit) {
      return (
        <div>
          <ReviewDisplay
            review={review}
            upVotes={upVotes}
            downVotes={downVotes}
          />
  
          <div>
            <input 
              type="submit"
              value="Edit"
              onClick={handleEdit}
            />
  
            <input 
              type="submit"
              value="Delete"
              onClick={handleDelete}
            />
          </div>

          <EditReviewForm
            userId={props.userId}
            editNewReview={props.editNewReview}
            getShow={props.getShow}
            handleEdit={props.handleEdit}
            showId={showId}
            reviewId={reviewId}
          />
        </div>
      )
    } else {
      return (
        <div>
          <ReviewDisplay
            review={review}
            upVotes={upVotes}
            downVotes={downVotes}
          />

          <div>
            <input 
              type="submit"
              value="Edit"
              onClick={handleEdit}
            />
  
            <input 
              type="submit"
              value="Delete"
              onClick={handleDelete}
            />
          </div>
        </div>
      )
    }
  } else {
    return (
      <ReviewDisplay
        review={review}
        upVotes={upVotes}
        downVotes={downVotes}
      />
    )
  }
}

export default ReviewTile