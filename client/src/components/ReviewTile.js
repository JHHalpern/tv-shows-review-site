import React, { useState } from "react"
import addNewVoteToTable from "../services/addNewVoteToTable.js"

const ReviewTile = (props) => {
  const [alreadyVoted, setAlreadyVoted] = useState(false)

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
  
  return (
    <div>
      <p>Score: {props.review.score} out of 5</p>
      <p>{props.review.body}</p>
      <div className="votes">
        {upButton}
        <p className="vote_text"> Upvotes: {props.review.upVotes} </p>
        {downButton}
        <p className="vote_text"> Downvotes: {props.review.downVotes} </p>
        {voteError}
      </div>
    </div>
  )
}

export default ReviewTile