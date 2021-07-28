import React, { useState } from "react"
import ErrorList from "./ErrorList.js"
import translateServerErrors from "../services/translateServerErrors.js"

const NewReviewForm = (props) => {
  const [newReview, setNewReview] = useState({
    body: "",
    score: "",
    votes: ""
  })

  const [errors, setErrors] = useState([])

  const userId = props.userId

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const showId = props.showId

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formattedNewReview = newReview
    formattedNewReview.userId = userId

    try {
      const response = await fetch(`/api/v1/shows/${showId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(formattedNewReview)
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
        const newReviewData = await response.json()
        const newReview = newReviewData.review
        props.addNewReview(newReview)
        setErrors([])
        clearForm()
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const clearForm = () => {
    setNewReview({
      body: "",
      score: ""
    })
  }

  const handleRadioClick = (event) =>{
    setNewReview({
      ...newReview,
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
          checked={newReview.score == rating}
          onChange={handleRadioClick}
        />
      </div>
    )
  })

  return (
    <div className= "newReviewForm callout secondary">
      <ErrorList errors={errors} />
      <h1>Make Your Dumb Review:</h1>
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
              value={newReview.body}
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

export default NewReviewForm