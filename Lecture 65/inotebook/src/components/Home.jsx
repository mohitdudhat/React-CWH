import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import { Notes } from "./Notes";
import { AddNote } from "./AddNote";
export const Home = () => {
  const context = useContext(NoteContext);
  const { note, setNote } = context;
  return (
    <div>
      <Notes />
    </div>
  );
};
