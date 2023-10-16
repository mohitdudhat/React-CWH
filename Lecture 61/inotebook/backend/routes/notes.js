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

//ROUTE 1 :Get all the Notes using: GET '/api/auth/getUser'. Login in required
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

//ROUTE 2 :Add new Notes using : POST '/api/auth/addNote'. Login in required
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

//ROUTE 3 : Update an existing Note using: PUT "/api/auth/updateNote". Login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    //Create a newNote object
    const { title, description, tag } = req.body;
    const newNote = {};
    newNote.title = title && title;
    newNote.description = description && description;
    newNote.tag = tag && tag;

    //find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    //check the authorization
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    //Search the notes using the id of the note ():id)
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4 : Update an existing Note using: DELETE "/api/auth/updateNote". Login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    //find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    //check the authorization
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    //Search the notes using the id of the note ():id)
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note successfully Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
