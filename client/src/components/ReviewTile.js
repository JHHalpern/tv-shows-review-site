import React, { useState } from "react"
import addNewVoteToTable from "../services/addNewVoteToTable.js"

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
    setShowVoteError(false)
    let alreadyVoted = false
    props.votes.forEach(vote => {
      if(vote.userId === props.userId) {
        alreadyVoted = true
        setShowVoteError(true)
      }
    })
    if(!alreadyVoted) {
      const newVote = await addNewVoteToTable(props.userId, event.currentTarget.value, props.reviewId)
      props.addNewVoteToPage(newVote, props.reviewId)
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
        <p className="vote_text"> Upvotes: {upVotes} </p>
        <button 
          type="button" 
          className={buttonClass} 
          value="down"
          onClick={handleClick}
        >
          &#x2193;Vote
        </button>
        <p className="vote_text"> Downvotes: {downVotes} </p>
        {voteError}
      </div>
    </div>
  )
}

export default ReviewTile