import React, { useContext, useState, useEffect, useRef } from "react";
import { NoteItem } from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";
import { AddNote } from "./AddNote";
export const Notes = () => {
  const context = useContext(NoteContext);
  const { note, getAllNotes, addNote } = context;
  const [notes, setNotes] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    getAllNotes();
    //eslint-disable-next-line
  }, []);
  const handleClick = (e) => {
    console.log("updating the note",note);
    e.preventDefault();
  };
  const ref = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                      id="etitle"
                      name="etitle"
                      value={notes.etitle}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      onChange={onChange}
                      value={notes.edescription}
                      type="edescription"
                      id="edescription"
                      name="edescription"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      tag
                    </label>
                    <input
                      value={notes.etag}
                      onChange={onChange}
                      type="etag"
                      id="etag"
                      name="etag"
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onclick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          {note.map((noteItem, index) => {
            return (
              <NoteItem
                key={noteItem._id}
                updateNote={updateNote}
                note={noteItem}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
