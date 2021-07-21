import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

<<<<<<< HEAD
const clientRoutes = ["/", "/shows", "/user-sessions/new", "/users/new", "/shows/new", "/shows/:id"];
=======
const clientRoutes = ["/", "/shows", "/user-sessions/new", "/users/new", "shows/new", "/shows/:id"];

>>>>>>> 3a30f309b990d7ca4899daa068a0d90a587d32b8
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
