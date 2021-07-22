import React from "react"

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

  return (
    <div>
      <p>Score: {props.score} out of 5</p>
      <p>{props.body}</p>
      <p>Upvotes: {upVotes}  Downvotes: {downVotes}</p>
    </div>
  )
}

export default ReviewTile