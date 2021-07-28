import express from "express"
import { Vote } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const votesRouter = new express.Router()

votesRouter.delete("/:id", async (req, res) => {
  const voteId = req.params.id
  try {
    const deleted = await Vote.query().deleteById(voteId)
    return res.status(200).json()
  } catch(err) {
    return res.status(500).json(err)
  }
})

votesRouter.patch("/", async (req, res) => {
  const newVoteData = req.body
  const cleanedData = cleanUserInput(newVoteData)
  try {
    const updatedReview = await Vote.query().updateAndFetchById(cleanedData.id, {
      direction: cleanedData.direction,
      userId: cleanedData.userId,
      reviewId: cleanedData.reviewId
    })
    return res.status(204).json(updatedReview)
  } catch(err) {
    return res.status(500).json(err)
  }
})

export default votesRouter