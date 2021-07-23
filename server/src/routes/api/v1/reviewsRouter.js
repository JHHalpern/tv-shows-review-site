import express from "express"
import { Review } from "../../../models/index.js"
import showsReviewRouter from "./showsReviewsRouter"

const reviewsRouter = new express.Router()

reviewsRouter.use("/:showId/shows", showsReviewRouter)

export default reviewsRouter


// import express from "express"
// import { Review, Show } from "../../../models/index.js"
// import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

// const reviewsRouter = new express.Router({mergeParams: true})

// reviewsRouter.get("/", async (req, res) => {
//   try{
//     const reviewList = await Review.query()
//     const serializedReviews = reviewList.map((review) => {
//         return ReviewSerializer.getSummary(review)
//       })
//     return res.status(200).json({ reviews: serializedReviews })
//   }
//   catch(error){
//     console.error(`Error in fetch ${error}`)
//     return res.status(500).json({ errors: error })
//   }
// })

// export default reviewsRouter
