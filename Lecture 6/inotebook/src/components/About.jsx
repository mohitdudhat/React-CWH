import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export const About = () => {
  const noteContext = useContext(NoteContext);
  return <div>This is About {noteContext.name}</div>;
};
