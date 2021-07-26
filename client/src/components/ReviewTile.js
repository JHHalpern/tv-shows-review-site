import React, { useState } from "react"
import addNewVoteToTable from "../services/addNewVoteToTable.js"

const ReviewTile = (props) => {
  const [showVoteError, setShowVoteError] = useState(false)

  const handleClick = async (event) => {
    setShowVoteError(false)
    let alreadyVoted = false
    props.review.votes.forEach(vote => {
      if(vote.userId === props.userId) {
        alreadyVoted = true
        setShowVoteError(true)
      }
    })
    if(!alreadyVoted) {
      const newVote = await addNewVoteToTable(props.userId, event.currentTarget.value, props.review.id)
      props.addNewVoteToPage(newVote, props.review.id)
    }
  }
  
  let voteError
  if(showVoteError) {
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