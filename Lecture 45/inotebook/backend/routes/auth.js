const express = require("express");
const router = express.Router();
const User = require("../models/Users");

//Create a User using :POST "/api/auth/". Does not require Auth
router.post("/", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  console.log(user);
  user.save();
});
router.get("/api/auth/", (req, res) => {
  res.json(User.findOne({}));
});
module.exports = router;
