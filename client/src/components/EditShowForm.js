import React, { useState } from "react"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const EditShowForm = ({ showId, userId, handleEditShow }) => {
  const [editShow, setEditShow] = useState({
    name: "",
    description: "",
  })

  const [errors, setErrors] = useState([])

  const handleInputChange = (event) => {
    setEditShow({
      ...editShow,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
    
  const handleSubmit = async (event) => {
    event.preventDefault()

    const editedShow = editShow
    editedShow.userId = userId

    try {
      const response = await fetch(`/api/v1/shows/${showId}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(editedShow)
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
        const editedShow = await response.json()
        handleEditShow(editedShow.serializedShow)
      }
    } catch(error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const clearForm = () => {
    setEditShow({
        name: "",
        description: "",
    })
  }

  return (
    <div>
      <h1>Edit Show</h1>
      <ErrorList errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editShow.name}
          onChange={handleInputChange}
        />

        <label htmlFor="description">Description: </label>
        <input 
          type="text"
          id="description"
          name="description"
          value={editShow.description}
          onChange={handleInputChange}
        />
        
        <input 
          type="submit"
          value="Edit Show"
        />
      </form>
    </div>
  )
}

export default EditShowForm