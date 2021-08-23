import React, { useState, useEffect } from "react"
import EditReviewForm from "./EditReviewForm.js"
import ReviewDisplay from "./ReviewDisplay.js"
import addNewVoteToTable from "../services/addNewVoteToTable.js"
import deleteVote from "../services/deleteVote.js"
import editVote from "../services/editVote.js"

const ReviewTile = (props) => {
  const [canEdit, setCanEdit] = useState(false)

  const existingVote = props.review.votes.find(vote => vote.userId === props.userId)

  const handleClick = async (event) => {
    if(existingVote) {
      if(existingVote.direction === event.currentTarget.value) {
        deleteVote(existingVote.id)
        props.updateVotesOnPage()
      } else {
        editVote(existingVote)
        props.updateVotesOnPage()
      }
    } else {
      const newVote = await addNewVoteToTable(props.userId, event.currentTarget.value, props.review.id)
      props.updateVotesOnPage()
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
      if(!response.ok) {
        const errorMessage = `${response.status}: (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      } else {
        props.handleDelete(reviewId)
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const handleEdit = (event) => {
    event.preventDefault()
    setCanEdit(!canEdit)
  }

  let editDeleteButtons
  if(props.userId === review.userId || props.admin === true) {
    editDeleteButtons = (
      <div>
        <input
          className="adminButtons"
          type="submit"
          value="Edit"
          onClick={handleEdit}
        />

        <input
          className="adminButtons"
          type="submit"
          value="Delete"
          onClick={handleDelete}
        />
      </div>
    )
  }

  let editForm
  if(canEdit && (props.userId === review.userId || props.admin === true)) {
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
        userId={props.userId}
        existingVote={existingVote}
        handleClick={handleClick}
      />
      {editDeleteButtons}
      {editForm}
    </div>
  )
}

export default ReviewTile
