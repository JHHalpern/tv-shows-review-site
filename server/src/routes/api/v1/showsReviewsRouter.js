import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const reviewsRouter = new express.Router({ mergeParams: true})

reviewsRouter.post("/", async (req,res) => {
  const showID = req.params.id
  console.log(req.params)
  const formInput = cleanUserInput(req.body)
  const reviewBody = formInput.body
  
  try {
    const newReview = await Review.query().insertAndFetch({body: reviewBody, showId: showID})
    return res.status(201).json({ review: newReview })
  }
  catch(error) {
      if(error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
    return res.status(500).json({ error })
  }  
})

export default reviewsRouter