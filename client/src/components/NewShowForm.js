import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const NewShowForm = (props) => {
  const [newShow, setNewShow] = useState({
    name: "",
    description: ""
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setNewShow({
      ...newShow,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/shows", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newShow)
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
        setShouldRedirect(true)
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  if(shouldRedirect) {
    return <Redirect push to="/shows" />
  }

  return (
    <div>
      <h1>Submit a New Show</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={newShow.name}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description: </label>
        <input 
          type="text"
          id="description"
          name="description"
          value={newShow.description}
          onChange={handleInputChange}
        />
        
        <input 
          type="submit"
          value="Add Show"
        />
      </form>
    </div>
  )
}

export default NewShowForm