import React, {useContext} from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
    const {note, updateNote} = props;
  return (
    <div>  
        <div className="card my-3">
  <div className="card-header container-fluid">
  {note.title}
  <div className="float-end">
    <i className="bi bi-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("deleted Successfully","success")}}></i>
      
    <i className="bi bi-pencil-square mx-2" onClick={() => {updateNote(note); }}></i>
    </div>
  </div>
  <div className="card-body">
    <blockquote className="blockquote mb-0">
      <p>{note.description}</p>
      <footer className="blockquote-footer"><cite title="Source Title">{note.tag}</cite></footer>
    </blockquote>
    
    
  </div>
</div>
    </div>
  )
}

export default NoteItem