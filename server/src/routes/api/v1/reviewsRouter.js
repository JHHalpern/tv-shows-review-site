import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const reviewsRouter = new express.Router()

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
    const editedFormattedReview = await Review.query().updateAndFetchById(reviewId, {
      body: editedReview.body,
      score: editedReview.score,
      showId: editedReview.showId,
      userId: editedReview.userId
    })
    return res.status(200).json(editedFormattedReview)
  } catch(error) {
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
  return res.status(500).json({ error })
  }
})

export default reviewsRouter