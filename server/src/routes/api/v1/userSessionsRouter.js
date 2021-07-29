import express from "express";
import passport from "passport";

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  console.log("hello")
  return passport.authenticate("local", (err, user) => {
    if (err) {
      console.log("error")
    }
    if (user) {
      console.log("user")
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json(undefined);
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

export default sessionRouter;
