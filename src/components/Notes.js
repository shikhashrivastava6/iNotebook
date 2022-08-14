import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getnotes, editNote } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes()
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState(
   { id: "",
    etitle: "",
    edescription: "",
    etag: "default",
});

  const updateNote = (currentNote) => {
      ref.current.click();
      setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  };
  

  const handleClick = (e) => {
    console.log("Updating the note",note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("updated successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* select box for tag */}
    <label htmlFor="etag" className="form-label">tag : </label>
      <select className="form-select" value={note.etag} name="etag" id="etag" minLength={5} required onChange={onChange}>
        <option defaultValue="General">General</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Life">Life</option>
        <option value="Travel">Travel</option>
      </select>

      {/* input field for title  */}
      <div className="mb-3">
        <label htmlFor="etitle" className="form-label">
          title
        </label>
        <input type="text" className="form-control" value={note.etitle} minLength={5} required  onChange={onChange} name="etitle" id="etitle" placeholder="title"/>
      </div>

      {/* input field for description  */}
      <div className="mb-3">
        <label htmlFor="edescription" className="form-label">
          Description
        </label>
        <textarea className="form-control" id="edescription" minLength={5} required value={note.edescription} onChange={onChange} name="edescription" rows="3" >
        </textarea>
      </div>
    
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-3">
        {notes.length === 0 && 'No notes to Display'}
        </div>
        {
          ( notes && notes.length > 0 ) ? notes.map(note => {
          return (
            <NoteItem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        )
        }): null}
      </div>
    </>
  );
};

export default Notes;
