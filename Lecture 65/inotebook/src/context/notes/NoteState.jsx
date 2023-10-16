import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = `http://localhost:5000`;
  const notesInitial = [];
  const [note, setNote] = useState(notesInitial);
  useEffect(() => {}, []);

  //Get all Notes from the MongoDB
  const getAllNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU5YTMyNDA1NGEwNzYzZTBhNDUzYiIsImVtYWlsIjoiTW9oaXQxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk1OTE2MDgwfQ.j8iusqPm62gvttnFWR4fkxvqCrn3S68UN4AMQYZP9Sw",
      },
    });
    const json = await response.json();
    console.log(json);
    setNote(json);
  };

  //Add a Note
  const addNote = async ({ title, description, tag = "General" }) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU5YTMyNDA1NGEwNzYzZTBhNDUzYiIsImVtYWlsIjoiTW9oaXQxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk1OTE2MDgwfQ.j8iusqPm62gvttnFWR4fkxvqCrn3S68UN4AMQYZP9Sw",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    console.log(json);
    const newNote = {
      user: "65159a324054a0763e0a453b",
      title: title,
      description: description,
      tag: tag,
      date: "2023-09-28T19:23:43.697Z",
      _id: "6515d2d93a0c204218eaa18d",
      __v: 0,
    };
    setNote(note.concat(newNote));
  };

  //Delete a Note
  const deleteNote = (id) => {
    console.log("Id");
    const newNotes = note.filter((item) => item._id !== id);
    setNote(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call

    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU5YTMyNDA1NGEwNzYzZTBhNDUzYiIsImVtYWlsIjoiTW9oaXQxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk1OTE2MDgwfQ.j8iusqPm62gvttnFWR4fkxvqCrn3S68UN4AMQYZP9Sw",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit the note
    const newNotes = note.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          title: title,
          description: description,
          tag: tag,
        };
      }
      return item;
    });
    setNote(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ note, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
