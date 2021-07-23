import React, { useEffect, setStatus } from "react"

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

  const handleEdit = async (event) => {
    even.preventDefault()
    
  }

  if(props.userId === props.reviewUserId) {
    return (
      <div>
        <p>Score: {props.score} out of 5</p>
        <p>{props.body}</p>
        <p>Upvotes: {upVotes}  Downvotes: {downVotes}</p>

        <div>
          <input 
            type="submit"
            value="Edit"
          />

          <input 
            type="submit"
            value="Delete"
            onClick={handleDelete}
          />
        </div>
    
      </div>
    )
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