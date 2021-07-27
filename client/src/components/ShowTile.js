import React from "react"
import { Link } from "react-router-dom"

const ShowTile = (props) => {
  return (
    <div  className="callout">
      <Link to={`/shows/${props.id}`}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
      </Link>
    </div>
  )
}

export default ShowTile