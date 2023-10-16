import React, { useContext, useState, useEffect, useRef } from "react";
import { NoteItem } from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";
import { AddNote } from "./AddNote";
export const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  const [note, setNote] = useState({
    etitle: "",
    edescription: "",
    etag: "",
  });

  useEffect(() => {
    getAllNotes();
    //eslint-disable-next-line
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note);
    refClose.current.click();
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const currentNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value || note[e.target.name],
    });
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
                      value={note.etitle}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      onChange={onChange}
                      value={note.edescription}
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
                      value={note.etag}
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
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row my-3">
          {notes.map((noteItem, index) => {
            return (
              <NoteItem
                key={noteItem._id}
                currentNote={currentNote}
                note={noteItem}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
