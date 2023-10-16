const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const validate = [
  body("title").isLength({ min: 3 }).withMessage("Enter Valid Title"),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),
];

//ROUTE 1 :Get all the Notes using: '/api/auth/getUser'. Login in required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.findOne({
      user: req.user.user,
    });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 :Add new Notes using: '/api/auth/addNote'. Login in required
router.post("/addNote", fetchUser, validate, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //If there are errors ,return BadRequest and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const saveNote = await note.save();
    res.json(saveNote);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
