import express from "express"
import objection from "objection"
const { ValidationError } = objection

import { Show } from "../../../models/index.js"
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

showsRouter.get("/:id", async(req,res) => {
  const showId = req.params.id
  try {
    const show = await Show.query().findById(showId)
    const serializedShow = await ShowSerializer.getSummary(show)
    return res.status(200).json({ show: serializedShow })
  } catch(err){
    return res.status(500).json({ errors: err })
  }
})

showsRouter.get("/:id", async(req,res) => {
  const showId = req.params.id
  try {
    const show = await Show.query().findById(showId)
    const serializedShow = ShowSerializer.getSummary(show)
    return res.status(200).json( { show: serializedShow } )
  } catch(err){
    return res.status(500).json({errors: err})
  }
})

export default showsRouter