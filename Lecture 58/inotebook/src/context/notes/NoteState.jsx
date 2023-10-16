import { useState, useEffect } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const s1 = {
    name: "mohit",
    class: "5B",
  };
  const [state, setState] = useState(s1);

  useEffect(() => {
    setTimeout(() => {
      setState({
        name: "mohit Dudhat",
        class: "6B",
      });
    }, 3000);
  }, []);

  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};
export default NoteState;
