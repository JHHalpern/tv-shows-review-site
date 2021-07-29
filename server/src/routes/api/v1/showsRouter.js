import express from "express"
import objection from "objection"
const { ValidationError } = objection
import { Show, Review, Vote } from "../../../models/index.js"
import showsReviewRouter from "./showsReviewsRouter.js"
import ShowSerializer from "../../../serializers/ShowSerializer.js"
import showsReviewsRouter from "./showsReviewsRouter.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const showsRouter = new express.Router()

showsRouter.use("/:id/reviews", showsReviewsRouter)

showsRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.query()
    const serializedShows = await Promise.all(
      shows.map(async (show) => {
        return await ShowSerializer.getSummary(show)
      })
    )
    return res.status(200).json({ shows: serializedShows })
  } catch(error) {
    return res.status(500).json({ error })
  }
})

showsRouter.post("/", async (req, res) => {
  const body = req.body
  const formInput = cleanUserInput(body)
  try {
    const newShow = await Show.query().insertAndFetch(formInput)
    return res.status(201).json({ show: newShow })
  }
  catch(error) {
      if(error instanceof ValidationError) {
        return res.status(422).json({ errors: error.data })
      }
    return res.status(500).json({ error })
  }
})

showsRouter.patch("/:id", async (req, res) => {
  try {
    const editedShow = cleanUserInput(req.body)
    const showId = req.params.id
    const editedFormattedShow = await Show.query().updateAndFetchById(showId, {
      name: editedShow.name,
      description: editedShow.description
    })
    const serializedShow = await ShowSerializer.getDetail(editedFormattedShow)
    return res.status(200).json({ serializedShow })
  } catch (error) {
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error })
  }
})

showsRouter.delete("/:id", async (req, res) => {
  try {
    const showId = req.params.id
    const show = await Show.query().findById(showId)
    const reviews = await show.$relatedQuery("reviews")
    for (const review of reviews) {
      await review.$relatedQuery("votes").delete()
    }
    await show.$relatedQuery("reviews").delete()
    const deletedShow = await Show.query().deleteById(showId)
    return res.status(200).json({deletedShow})
  } catch(error) {
    return res.status(500).json({ error })
  }
})

showsRouter.get("/:id", async(req,res) => {
  const showId = req.params.id
  try {
    const show = await Show.query().findById(showId)
    const serializedShow = await ShowSerializer.getDetail(show)
    return res.status(200).json({ show: serializedShow })
  } catch(err) {
    return res.status(500).json({ errors: err })
  }
})

export default showsRouter