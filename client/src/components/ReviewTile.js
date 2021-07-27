import React, { useState, useEffect } from "react"
import NewReviewForm from "./NewReviewForm.js"
import EditReviewForm from "./EditReviewForm.js"
import ReviewDisplay from "./ReviewDisplay.js"
import addNewVoteToTable from "../services/addNewVoteToTable.js"

const ReviewTile = (props) => {
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  const [canEdit, setCanEdit] = useState(false)
  
  const handleClick = async (event) => {
    const existingVote = props.review.votes.find(vote => vote.userId === props.userId) 
    if(existingVote) {
      setAlreadyVoted(true)
      props.setShowError(true)
    }  
    if(!existingVote) {
      setAlreadyVoted(false)
      props.setShowError(false)
      const newVote = await addNewVoteToTable(props.userId, event.currentTarget.value, props.review.id)
      props.addNewVoteToPage(newVote, props.review.id)
    }
  }

  const review = props.review
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

  const handleEdit = (event) => {
    event.preventDefault()
    setCanEdit(!canEdit)
  }

  let voteError
  if(props.showError && alreadyVoted) {
    voteError = <p>You've already voted on this review!</p>
  }
  
  let upButton
  let downButton
  if(props.userId) {
    upButton = (
      <button 
        type="button" 
        className="vote_button"
        value="up"
        onClick={handleClick}
      >
        &#x2191;Vote
      </button>
    )
    downButton = (
      <button 
        type="button" 
        className="vote_button" 
        value="down"
        onClick={handleClick}
      >
        &#x2193;Vote
      </button>
    )
  }

  let editDeleteButtons
  if(props.userId === review.userId) {
    editDeleteButtons = (
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
    )
  }

  let editForm
  if(canEdit && props.userId === review.userId) {
    editForm = (
      <EditReviewForm
        userId={props.userId}
        editNewReview={props.editNewReview}
        handleEdit={props.handleEdit}
        showId={showId}
        reviewId={reviewId}
      />
    )
  }

  return (
    <div>
      <ReviewDisplay
        review={review}
        upVotes={upVotes}
        downVotes={downVotes}
      />
      
      {editDeleteButtons}

      {editForm}
    </div>
  )
}

export default ReviewTile