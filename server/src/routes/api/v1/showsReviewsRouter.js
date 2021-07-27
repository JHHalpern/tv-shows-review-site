import express from "express"
import objection from "objection"
const { ValidationError } = objection
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"
import { Review, Show } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const showsReviewsRouter = new express.Router({ mergeParams: true})

showsReviewsRouter.get("/", async (req, res) => {
  const showId = req.params.id
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

showsReviewsRouter.post("/", async (req,res) => {
  const uncleanInput = req.body
  const showId = req.params.id
  const userId = req.body.userId
  uncleanInput.showId = showId
  uncleanInput.userId = userId

  const formInput = cleanUserInput(uncleanInput)
  
  try {
    const newReview = await Review.query().insertAndFetch(formInput)
    const serializedReview = await ReviewSerializer.getDetail(newReview)
    return res.status(201).json({ review: serializedReview })
  } catch(error) {
      if(error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
    return res.status(500).json({ error })
  }  
})

export default showsReviewsRouter