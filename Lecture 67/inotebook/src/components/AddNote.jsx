import React, { useState, useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
export const AddNote = () => {
  const context = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const { addNote } = context;
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            onChange={onChange}
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={onChange}
            type="description"
            id="description"
            name="description"
            className="form-control"
          />
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            tag
          </label>
          <input
            onChange={onChange}
            type="tag"
            id="tag"
            name="tag"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};
