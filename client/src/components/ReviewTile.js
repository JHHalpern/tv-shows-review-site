import React, { useState } from "react"

const ReviewTile = (props) => {
  const [showVoteError, setShowVoteError] = useState(false)

  let upVotes = 0
  let downVotes = 0
  
  props.votes.forEach(vote => {
    if(vote.direction === "up") {
      upVotes++
    } else {
      downVotes++
    }
  })

  const handleClick = async (event) => {
    if(props.userId) {
      setShowVoteError(false)
      let alreadyVoted = false
      props.votes.forEach(vote => {
        if(vote.userId === props.userId) {
          alreadyVoted = true
          setShowVoteError(true)
        }
      })
      if(!alreadyVoted) {
        try {
          const response = await fetch(`/api/v1/reviews/${props.reviewId}/vote`, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            body: JSON.stringify({ userId: props.userId, direction: event.currentTarget.value })
          })
          if(!response.ok){
            const errorMessage = `${response.status}: (${response.statusText})`
            const error = new Error(errorMessage)
            throw(error)
          } else {
            const body = await response.json()
            props.addNewVote(body.newVote, props.reviewId)
          }
        } catch(err) {
          console.error(`Error in fetch: ${err.message}`)
        }
      }
    }
  }
  
  let voteError
  if(showVoteError) {
    voteError = <p>You've already voted on this review!</p>
  }

  let buttonClass
  if(props.userId) {
    buttonClass = "vote_button"
  } else {
    buttonClass = "logged_out_button"
  }
  
  return (
    <div>
      <p>Score: {props.score} out of 5</p>
      <p>{props.body}</p>
      <div className="votes">
        <button 
          type="button" 
          className={buttonClass} 
          value="up"
          onClick={handleClick}
        >
          &#x2191;Vote
        </button>
        <p className="vote_text">Upvotes: {upVotes}</p>
        <button 
          type="button" 
          className={buttonClass} 
          value="down"
          onClick={handleClick}
        >
          &#x2193;Vote
        </button>
        <p className="vote_text">Downvotes: {downVotes}</p>
        {voteError}
      </div>
    </div>
  )
}

export default ReviewTile