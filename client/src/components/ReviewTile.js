import React, { useState, useEffect, setStatus } from "react"
import NewReviewForm from "./NewReviewForm.js"

const ReviewTile = (props) => {
  let upVotes = 0
  let downVotes = 0
  
  props.votes.forEach(vote => {
    if(vote.direction === "up") {
      upVotes++
    } else {
      downVotes++
    }
  })

  const reviewId = props.reviewId
  const showId = props.showId
  console.log(`showId is... ${showId}`)

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/shows/${showId}/reviews/${reviewId}`, {
        method: "DELETE"
      }).then(() => setStatus('Deleted') )

    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const [canEdit, setCanEdit] = useState(false)

  const handleEdit = (event) => {
    event.preventDefault()
    setCanEdit(!canEdit)
  }

  if(props.userId === props.reviewUserId) {
    if(canEdit) {
      return (
        <div>
          <p>Score: {props.score} out of 5</p>
          <p>{props.body}</p>
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

          //make this into a EditReviewForm
          <NewReviewForm userId={props.userId} showId={props.showId} addNewReview={props.addNewReview}/>

        </div>
      )
    } else {
      return (
        <div>
          <p>Score: {props.score} out of 5</p>
          <p>{props.body}</p>
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
        <p>Score: {props.score} out of 5</p>
        <p>{props.body}</p>
        <p>Upvotes: {upVotes}  Downvotes: {downVotes}</p>
      </div>
    )
  }
}

export default ReviewTile