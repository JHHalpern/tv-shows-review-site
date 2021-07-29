import React, { useState } from "react"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const EditReviewForm = ({ showId, userId, reviewId, handleEdit }) => {
  const [editReview, setEditReview] = useState({
    body: "",
    score: "",
  })

  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setEditReview({
      ...editReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
    
  const handleSubmit = async (event) => {
    event.preventDefault()

    const editedReview = editReview
    editedReview.userId = userId
    editedReview.reviewId = reviewId
    editedReview.showId = showId

    try {
      const response = await fetch(`/api/v1/reviews/${reviewId}/edit`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(editedReview)
      })
      if(!response.ok) {
        if(response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status}: (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
      } else {
        setErrors([])
        clearForm()
        const updatedReview = await response.json()
        handleEdit(reviewId, updatedReview)
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const clearForm = () => {
    setEditReview({
      body: "",
      score: ""
    })
  }

  const handleRadioClick = (event) =>{
    setEditReview({
      ...editReview,
      score: event.currentTarget.value
    })
  }

  const ratings = [1, 2, 3, 4, 5]

  const reviewRating = ratings.map(rating => {
    return (
      <div key={rating} className="cell small-1">
        <label htmlFor={rating}>
          {rating}
        </label>
        
        <input
          id={rating}
          type="radio"
          name="score"
          value={rating}
          checked={editReview.score == rating}
          onChange={handleRadioClick}
        />
      </div>
    )
  })

  return (
    <div className= "editReviewForm callout secondary">
      <ErrorList errors={errors} />
      <h1>Edit Your Dumb Review:</h1>
        <div className="grid-x">
          {reviewRating}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="body">
            Body:
            <input
              type="text"
              name="body"
              onChange={handleInputChange}
              value={editReview.body}
            />
          </label>

          <div className="button-group">
            <input 
              className="button"
              type="submit" 
              value="submit" 
            />
          </div>
        </form>
    </div>
  )
}

export default EditReviewForm