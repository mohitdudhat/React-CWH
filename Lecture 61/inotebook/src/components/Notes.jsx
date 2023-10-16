import React, { useContext } from "react";
import { NoteItem } from "./NoteItem";
import NoteContext from "../context/notes/NoteContext";

export const Notes = () => {
  const context = useContext(NoteContext);
  const { note, setNote } = context;
  console.log(note);
  return (
    <div className="row my-3">
      {note.map((noteItem) => {
        console.log(noteItem);
        return <NoteItem note={noteItem} />;
      })}
    </div>
  );
};
