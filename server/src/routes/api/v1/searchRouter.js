import express from "express"
import { Show } from "../../../models/index.js"
import ShowSerializer from "../../../serializers/ShowSerializer.js"
 
const searchRouter = new express.Router()

searchRouter.get("/", async (req, res) => {
  try {
    const shows = await Show.query()
    const serializedShows = await Promise.all(
      shows.map(async (show) => {
        return await ShowSerializer.getSummary(show)
      })
    )
    console.log(serializedShows)
    return res.status(200).json({ shows: serializedShows })
  } catch(error) {
    return res.status(500).json({ error })
  }
})

searchRouter.get("/:searchQuery", async (req, res) => {
  const searchQuery = req.params.searchQuery
  try {
    const shows = await Show.query()
    const searchedShows = shows.filter(show => show.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const serializedShows = await Promise.all(
      searchedShows.map(async (show) => {
        return await ShowSerializer.getSummary(show)
      })
    )
    console.log(serializedShows)
    return res.status(200).json({ shows: serializedShows })
  } catch(error) {
    return res.status(500).json({ error })
  }
})

export default searchRouter