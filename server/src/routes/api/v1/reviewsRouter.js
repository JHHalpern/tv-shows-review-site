
import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Vote, Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import VoteSerializer from "../../../serializers/VoteSerializer.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
    try {
      const reviewId = req.params.id
      const review = await Review.query().findById(reviewId)
      const votes = await review.$relatedQuery("votes")
      for (const vote of votes) {
        await Vote.query().deleteById(vote.id)
      }
      const deleted = await Review.query().deleteById(reviewId)
      return res.status(200).json({ deletedReview: deleted })
    } catch(error) {
      return res.status(500).json({ error })
    }
  })

reviewsRouter.patch("/:id/edit", async (req, res) => {
  try {
    const editedReview = cleanUserInput(req.body)
    const reviewId = editedReview.reviewId
    const editedFormattedReview = await Review.query().updateAndFetchById(reviewId, {
      body: editedReview.body,
      score: editedReview.score,
      showId: editedReview.showId,
      userId: editedReview.userId
    })
    const serializedReview = await ReviewSerializer.getDetail(editedFormattedReview)
    return res.status(200).json(serializedReview)
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