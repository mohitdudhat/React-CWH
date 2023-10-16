import { useEffect } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const s1 = {
    name: "mohit",
    class: "5B",
  };

  useEffect(() => {}, []);

  return (
    <NoteContext.Provider value={s1}>{props.children}</NoteContext.Provider>
  );
};
export default NoteState;
