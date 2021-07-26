import React, { useState, useEffect, setStatus } from "react"

import NewReviewForm from "./NewReviewForm.js"
import EditReviewForm from "./EditReviewForm.js"

const ReviewTile = (props) => {
  const review = props.review

  let upVotes = 0
  let downVotes = 0

  review.votes.forEach(vote => {
    if(vote.direction === "up") {
      upVotes++
    } else {
      downVotes++
    }
  })

  const reviewId = review.id
  const showId = review.showId
 
  const handleDelete = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`/api/v1/shows/${showId}/reviews/${reviewId}`, {
        method: "DELETE"
      }).then(() => setStatus('Deleted') )
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
    
    props.getShow() 
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
          <p>Score: {review.score} out of 5</p>
          <p>{review.body}</p>
          <p>Upvotes: {upVotes}  Downvotes: {downVotes}</p>
  
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
            showId={review.showId}
            editNewReview={props.editNewReview}
            reviewId={review.id}
            getShow={props.getShow}
          />
        </div>
      )
    } else {
      return (
        <div>
          <p>Score: {review.score} out of 5</p>
          <p>{review.body}</p>
          <p>Upvotes: {upVotes}  Downvotes: {downVotes}</p>
  
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
      <div>
        <p>Score: {review.score} out of 5</p>
        <p>{review.body}</p>
        <p>Upvotes: {upVotes}  Downvotes: {downVotes}</p>
      </div>
    )
  }
}

export default ReviewTile