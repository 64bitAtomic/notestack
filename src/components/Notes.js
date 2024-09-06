import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNotes} = context;
  return (
    <>
    <AddNote/>
    <div className="row my-3">
    <h1>Your Notes</h1>
    {notes.map((notes) => {
      return <NoteItem key={notes._id} note={notes}/>
    })}
  </div>
  </>
  )
}
