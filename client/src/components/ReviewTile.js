import React from "react"

const ReviewTile = (props) => {
  return (
    <div>
      <p>{props.reviewBody}</p>
      <p>Score: {props.score} out of 5</p>
    </div>
  )
}

export default ReviewTile