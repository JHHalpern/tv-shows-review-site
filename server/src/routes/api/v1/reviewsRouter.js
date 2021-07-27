import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Vote, Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import VoteSerializer from "../../../serializers/VoteSerializer.js"

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

reviewsRouter.post("/:id/vote", async (req, res) => {
  const reviewId = req.params.id
  const newVoteData = req.body
  newVoteData.reviewId = reviewId
  const cleanedData = cleanUserInput(newVoteData)
  try {
    const newVote = await Vote.query().insertAndFetch(cleanedData)
    const serializedVote = VoteSerializer.getSummary(newVote)
    return res.status(201).json({ newVote: serializedVote })
  } catch(err) {
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
  return res.status(500).json({ error })
  }
})

export default reviewsRouter