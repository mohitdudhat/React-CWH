import React, { useContext } from "react";
import { NoteItem } from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";
import { AddNote } from "./AddNote";

export const Notes = () => {
  const context = useContext(NoteContext);
  const { note, addNote } = context;
  console.log(note);
  return (
    <>
      <AddNote />
      <div className="container">
        <div className="row my-3">
          {note.map((noteItem, index) => {
            return <NoteItem key={note._id} note={noteItem} />;
          })}
        </div>
      </div>
    </>
  );
};
