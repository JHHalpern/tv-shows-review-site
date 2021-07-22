import React from "react"

const ReviewTile = (props) => {
  return (
    <div>
      <p>Score: {props.score} out of 5</p>
      <p>{props.body}</p>
    </div>
  )
}

export default ReviewTile