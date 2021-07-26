import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const reviewsRouter = new express.Router({ mergeParams: true})

reviewsRouter.post("/", async (req,res) => {
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

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id
    await Review.query().deleteById(reviewId)
    return res.status(200).json()
  } catch(error) {
    return res.status(500).json({ error })
  }
})

reviewsRouter.patch("/edit", async (req, res) => {
  try {
    const editedReview = cleanUserInput(req.body)
    const reviewId = editedReview.reviewId
    await Review.query().update({
      body: editedReview.body,
      score: editedReview.score,
      showId: editedReview.showId,
      userId: editedReview.userId })
      .where('id', reviewId)
  } catch(error) {
    console.log(error)
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
  return res.status(500).json({ error })
  }
})

export default reviewsRouter