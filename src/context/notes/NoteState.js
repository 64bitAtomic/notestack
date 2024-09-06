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
      ]

      const [notes, setNotes] = useState(notesInitial);
    return (
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;