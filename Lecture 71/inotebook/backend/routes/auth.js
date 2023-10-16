const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const JWT_SECRET = "jwt-secret";
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
let success = false;
const validate = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
const validateLogin = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").exists().withMessage("Password cannot be blank"),
];
//ROUTE 1: Create a User using :POST "/api/auth/createUser". Does require Auth
router.post("/createUser", validate, async (req, res) => {
  //If there are errors ,return BadRequest and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success });
  }
  //Check whether the user,with this email exists already

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        success,
        errors: "Sorry a user with this email already exists",
      });
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.password, salt);
      // Create a new user and hash password
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2: Authenticate a User using :POST "/api/auth/login". No Login  require
router.post("/login", validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success,
        errors: "Please try to login with correct credentials",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({
        success,
        errors: "Please try to login with correct credentials",
      });
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const authToken = jwt.sign(payload, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 3: Get logged in user details using: POST "/api/auth/getUser". Login require
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
