import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line 
  }, [])

  const UpdateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

  }
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = (e) => {
    console.log("Updating note.......", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    // e.preventDefault();

  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote key={notes._id} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog text-white">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label ">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-1 my-2 text-white" style={{ fontSize: 24 }}>{notes.length === 0 && <>
          <div className="card text-bg-dark mb-3" >
            <div className="card-header">Empty Note Stack <i className="fa-regular fa-file-lines"></i> </div>
            <div className="card-body">
              <h5 className="card-title">Add a Note</h5>
              <p className="card-text">Title and Description must be more then 5 characters.</p>
            </div>
          </div>



        </>}</div>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} UpdateNote={UpdateNote} note={notes} />
        })}
      </div>
    </>
  )
}
