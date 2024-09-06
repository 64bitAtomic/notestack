import { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "66d7d78225e45b626c85bb39",
      "user": "66d315683f92ed3e5e7b4695",
      "title": "My Title",
      "description": "Please Wake up early.",
      "tag": "personal",
      "date": "2024-09-04T03:44:02.636Z",
      "__v": 0
    },
    {
      "_id": "66d81216086049aac67feaa3",
      "user": "66d315683f92ed3e5e7b4695",
      "title": "My Title",
      "description": "Please Wake up early.",
      "tag": "personal",
      "date": "2024-09-04T07:53:58.681Z",
      "__v": 0
    },
    {
      "_id": "66d81255086049aac67feaa5",
      "user": "66d315683f92ed3e5e7b4695",
      "title": "Watch anime",
      "description": "Rezero ",
      "tag": "personal",
      "date": "2024-09-04T07:55:01.179Z",
      "__v": 0
    },
    {
      "_id": "66d81216086049aac67feaa31",
      "user": "66d315683f92ed3e5e7b4695",
      "title": "My Title",
      "description": "Please Wake up early.",
      "tag": "personal",
      "date": "2024-09-04T07:53:58.681Z",
      "__v": 0
    },
    {
      "_id": "66d81255086049aac67feaa51",
      "user": "66d315683f92ed3e5e7b4695",
      "title": "Watch anime",
      "description": "Rezero ",
      "tag": "personal",
      "date": "2024-09-04T07:55:01.179Z",
      "__v": 0
    },
    {
      "_id": "66d81216086049aac67feaa32",
      "user": "66d315683f92ed3e5e7b4695",
      "title": "My Title",
      "description": "Please Wake up early.",
      "tag": "personal",
      "date": "2024-09-04T07:53:58.681Z",
      "__v": 0
    },
    {
      "_id": "66d81255086049aac67feaa52",
      "user": "66d315683f92ed3e5e7b4695",
      "title": "Watch anime",
      "description": "Rezero ",
      "tag": "personal",
      "date": "2024-09-04T07:55:01.179Z",
      "__v": 0
    },
  ]

  const [notes, setNotes] = useState(notesInitial);

  // Function to add a note
  const addNote=(title,description,tag)=>{
    console.log("Adding a New Note.....");
    const note =  {
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
  const deleteNote=(id)=>{
    console.log("Deleting note "+ id);
    const newNote = notes.filter((note)=>{return note._id !==id;});
    setNotes(newNote);
    
  }
  // Function to edit a note
  const editNote=()=>{

  }
  return (
    <noteContext.Provider value={{ notes, addNote,deleteNote,editNote}}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;