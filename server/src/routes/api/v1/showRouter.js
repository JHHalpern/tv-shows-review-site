import express from "express"
// import { Show } from 

const showsRouter = new express.Router()

showsRouter.get("/:id/info", async(req,res) => {
  const showId = req.params.id
  try{
    const show = await Show.query().findById(showId)
    return res.status(200).json({show})
  }catch(err){
    return res.status(500).json({errors: err})
  }
})

showsRouter.get("/", async(req,res) => {
  try{
    const showList = await Shows.query()
    return res.status(200).json({showList})
  }catch(err){
    return res.status(500).json({errors: err})
  }
})

export default showsRouter