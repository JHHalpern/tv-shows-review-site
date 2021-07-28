import express from "express"
import { Vote } from "../../../models/index.js"

const votesRouter = new express.Router()

votesRouter.delete("/:id", async (req, res) => {
  voteId = req.params.id
  try {
    const deleted = await Vote.query().deleteById(voteId)
    return res.status(200).json()
  } catch(err) {
    return res.status(500).json(err)
  }
})

export default votesRouter