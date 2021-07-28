import React from "react"

const ReviewDisplay = (props) => {
  return(
    <div className="callout">
      <p>Score: {props.review.score} out of 5</p>
      <p>{props.review.body}</p>
      {props.votesDiv}
    </div>
  )
}

export default ReviewDisplay