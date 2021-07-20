import express from "express"

import ShowsClient from "../../../apiClient/ShowsClient"

const showsRouter = new express.Router()

showsRouter.get("/", async (req, res) =>{
  const pageNumber = req.query.pageNumber

  try{
    const showsResponse = await ShowsClient.getShows(pageNumber)
    const showData = JSON.parse(showsResponse)
    return res
      .set({ "Content-Type": "application/json" })
      .status(200)
      .json(showData)
  } catch (error) {
    return res.status(401).json({ errors: error})
  }

})

export default showsRouter