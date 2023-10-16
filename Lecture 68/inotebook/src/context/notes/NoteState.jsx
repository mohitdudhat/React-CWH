import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = `http://localhost:5000`;
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  useEffect(() => {}, []);

  //Get all Notes from the MongoDB
  const getAllNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTZlOGNlYjhjOGMzNzljMDIwOWVmOCIsImVtYWlsIjoiTW9oaXQxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk2MDAwMjA2fQ.H7GGcl9g2EOnQ4rXU1bSviC_RtZzYt-nYZ7oeeMy0kQ",
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (e) {
      console.log(e);
    }
  };

  //Add a Note
  const addNote = async ({ title, description, tag = "General" }) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTZlOGNlYjhjOGMzNzljMDIwOWVmOCIsImVtYWlsIjoiTW9oaXQxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk2MDAwMjA2fQ.H7GGcl9g2EOnQ4rXU1bSviC_RtZzYt-nYZ7oeeMy0kQ",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const newNote = await response.json();
    setNotes(notes.concat(newNote));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTZlOGNlYjhjOGMzNzljMDIwOWVmOCIsImVtYWlsIjoiTW9oaXQxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk2MDAwMjA2fQ.H7GGcl9g2EOnQ4rXU1bSviC_RtZzYt-nYZ7oeeMy0kQ",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const json = await response.json();
    const newNotes = notes.filter((item) => item._id !== id);
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async ({
    id,
    etitle: title,
    edescription: description,
    etag: tag,
  }) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTZlOGNlYjhjOGMzNzljMDIwOWVmOCIsImVtYWlsIjoiTW9oaXQxMjNAZ21haWwuY29tIiwiaWF0IjoxNjk2MDAwMjA2fQ.H7GGcl9g2EOnQ4rXU1bSviC_RtZzYt-nYZ7oeeMy0kQ",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();

    //Logic to edit the note
    const newNotes = notes.map((item) => {
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
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
