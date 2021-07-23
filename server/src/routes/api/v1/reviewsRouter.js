import express from "express"
import { Vote } from "../../../models/index.js"
import objection from "objection"
const { ValidationError } = objection
import cleanVoteInput from "../../../services/cleanVoteInput.js"

const reviewsRouter = new express.Router()

reviewsRouter.post("/:id/vote", async (req, res) => {
  const reviewId = req.params.id
  const newVoteData = req.body
  newVoteData.reviewId = reviewId
  const cleanedData = cleanVoteInput(newVoteData)
  try {
    const newVote = await Vote.query().insertAndFetch(cleanedData)
    return res.status(201).json({ newVote })
  } catch(err) {
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
  return res.status(500).json({ error })
  }
})

export default reviewsRouter