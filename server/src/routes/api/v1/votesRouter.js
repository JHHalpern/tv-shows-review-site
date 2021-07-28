import express from "express"
import { Vote } from "../../../models/index.js"

const votesRouter = new express.Router()

votesRouter.delete("/:id", async (req, res) => {
  const voteId = req.params.id
  console.log(voteId)
  try {
    const deleted = await Vote.query().deleteById(voteId)
    console.log(deleted)
    return res.status(200).json()
  } catch(err) {
    return res.status(500).json(err)
  }
})

export default votesRouter