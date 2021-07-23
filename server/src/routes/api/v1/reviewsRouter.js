import express from "express"
import { Review } from "../../../models/index.js"
import showsReviewRouter from "./showsReviewsRouter.js"

const reviewsRouter = new express.Router()

reviewsRouter.use("/shows/:id", showsReviewRouter)

export default reviewsRouter