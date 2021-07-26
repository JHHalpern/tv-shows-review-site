import express from "express"
import { Vote } from "../../../models/index.js"
import objection from "objection"
const { ValidationError } = objection
import cleanUserInput from "../../../services/cleanUserInput.js"
import VoteSerializer from "../../../serializers/VoteSerializer.js"
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"
import { Show, Review } from "../../../models/index.js"

const reviewsRouter = new express.Router()

reviewsRouter.get("/:showId", async (req, res) => {
  const showId = req.params.showId
  try {
    const show = await Show.query().findById(showId)
    const reviews = await show.$relatedQuery("reviews")
    const serializedReviews = await Promise.all(
      reviews.map(async (review) => {
        return await ReviewSerializer.getDetail(review)
      })
    )
    return res.status(200).json({ reviews: serializedReviews })
  } catch(error) {
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