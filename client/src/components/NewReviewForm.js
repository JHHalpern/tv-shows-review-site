import React, { useState } from "react"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const NewReviewForm = (props) => {
  const [newReview, setNewReview] = useState({
    body: ""
  })

  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const showId = props.showId

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(`/api/v1/shows/${showId}/reviews`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newReview)
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
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const clearForm = () => {
    setNewReview({
      body: ""
    })
  }

  return (
    <div className= "newReviewForm">
      <ErrorList errors={errors} />
      <h1>Make Your Dumb Review:</h1>
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