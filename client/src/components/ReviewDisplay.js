import React from "react"

const ReviewDisplay = (props) => {
  return(
    <div>
      <p>Score: {props.review.score} out of 5</p>
      <p>{props.review.body}</p>
      <p>Upvotes: {props.upVotes}  Downvotes: {props.downVotes}</p>
    </div>
  )
}

export default ReviewDisplay