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

//Create a User using :POST "/api/auth/createUser". Does not require Auth
router.post("/createUser", validate, async (req, res) => {
  //If there are errors ,return BadRequest and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Check whether the user,with this email exists already

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(200).json({
        errors: "Sorry a user with this email already exists",
      });
    } else {
      // Create a new user
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
