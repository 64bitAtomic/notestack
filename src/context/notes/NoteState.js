import { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000/";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

   // Function to get all note
   const getNotes = async () => {
    console.log("Adding a New Note.....");
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkMzE1NjgzZjkyZWQzZTVlN2I0Njk1In0sImlhdCI6MTcyNTIwMDgzOH0.e9EZVll15yCN8yGqgrMoprr6h3LIV7-n2Z9g0YnpdX0',

      }
    });
    const json = await response.json()
    console.log(json);
    setNotes(json);
    
  }

  // Function to add a note
  const addNote = async (title, description, tag) => {
    console.log("Adding a New Note.....");
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      body: JSON.stringify({title,description,tag}),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkMzE1NjgzZjkyZWQzZTVlN2I0Njk1In0sImlhdCI6MTcyNTIwMDgzOH0.e9EZVll15yCN8yGqgrMoprr6h3LIV7-n2Z9g0YnpdX0',

      }
    });
    
    const note = {
      "_id": "66d81255086049aac67feaa52123",
      "user": "66d315683f92ed3e5e7b4695",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-09-04T07:55:01.179Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  // Function to delete a note
  const deleteNote = (id) => {
    console.log("Deleting note " + id);
    const newNote = notes.filter((note) => { return note._id !== id; });
    setNotes(newNote);

  }
  // Function to edit a note
  const editNote = async (id, title, description, tag) => {
    // APi CAll 
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "POST",
      body: JSON.stringify({title,description,tag}),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZkMzE1NjgzZjkyZWQzZTVlN2I0Njk1In0sImlhdCI6MTcyNTIwMDgzOH0.e9EZVll15yCN8yGqgrMoprr6h3LIV7-n2Z9g0YnpdX0',

      }
    });
    const json = response.json();
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;