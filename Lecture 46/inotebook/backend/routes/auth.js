const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

const validate = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
router.get("/", (req, res) => {
  res.send("OK");
});
//Create a User using :POST "/api/auth/". Does not require Auth
router.post("/", validate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: "Please enter unique value for email",
        msg: err,
      });
    });
});
module.exports = router;
