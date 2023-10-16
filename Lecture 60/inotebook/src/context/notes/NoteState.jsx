import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const notesInitial = [
    {
      user: "65159a324054a0763e0a453b",
      title: "title hai na",
      description: "Y alkjdf;aopasdj lkjasld f",
      tag: "General",
      date: "2023-09-28T19:23:43.697Z",
      _id: "6515d2d93a0c204218eaa18d",
      __v: 0,
    },
    {
      user: "65159a324054a0763e0a453b",
      title: "title hai na",
      description: "Y alkjdf;aopasdj lkjasld f",
      tag: "General",
      date: "2023-09-28T19:23:43.697Z",
      _id: "6515d2d93a0c204218eaa18d",
      __v: 0,
    },
    {
      user: "65159a324054a0763e0a453b",
      title: "title hai na",
      description: "Y alkjdf;aopasdj lkjasld f",
      tag: "General",
      date: "2023-09-28T19:23:43.697Z",
      _id: "6515d2d93a0c204218eaa18d",
      __v: 0,
    },
  ];
  const [note, setNote] = useState(notesInitial);
  useEffect(() => {}, []);

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
