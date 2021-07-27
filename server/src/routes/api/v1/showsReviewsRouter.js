import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const showsReviewsRouter = new express.Router({ mergeParams: true})

showsReviewsRouter.post("/", async (req,res) => {
  const uncleanInput = req.body

  const showId = req.params.id
  const userId = req.body.userId
  uncleanInput.showId = showId
  uncleanInput.userId = userId

  const formInput = cleanUserInput(uncleanInput)
  
  try {
    const newReview = await Review.query().insertAndFetch(formInput)
    return res.status(201).json({ review: newReview })
  } catch(error) {
      if(error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
    return res.status(500).json({ error })
  }  
})

export default showsReviewsRouter