import React from "react"

const ReviewDisplay = (props) => {

  let votesDiv
  if(props.userId) {
    let directionUp = false
    let directionDown = false
    if(props.existingVote) {
      if(props.existingVote.direction === "up") {
        directionUp = true
      } else if (props.existingVote.direction === "down") {
        directionDown = true
      }
    }
    votesDiv = (
      <div>
      <button 
        type="button" 
        className={directionUp ? "selected_vote_button" : "vote_button"}
        value="up"
        onClick={props.handleClick}
      >
        &#x2191;Vote
      </button>
      <p className="vote_text"> Upvotes: {props.review.upVotes} </p>
      <button 
        type="button" 
        className={directionDown ? "selected_vote_button" : "vote_button"} 
        value="down"
        onClick={props.handleClick}
      >
        &#x2193;Vote
      </button>
      <p className="vote_text"> Downvotes: {props.review.downVotes} </p>
    </div>
    )
  } else {
    votesDiv = (
    <div>
      <p className="vote_text"> Upvotes: {props.review.upVotes} </p>
      <p className="vote_text"> Downvotes: {props.review.downVotes} </p>
    </div>
    )
  }

  return(
    <div className="callout">
      <p>Score: {props.review.score} out of 5</p>
      <p>{props.review.body}</p>
      {votesDiv}
    </div>
  )
}

export default ReviewDisplay