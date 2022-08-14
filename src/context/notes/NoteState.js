import NoteContext from "./NoteContext";
import { useState } from "react";

  const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const authToken = localStorage.getItem('token');
// get all Notes
const getnotes = async () =>{
   // API Call
   let response = await fetch(`${host}/api/notes/fetchallnotes` , {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
    },
  });
  const json = await response.json();
    setNotes(json) 
   }
  // Add a Note
  const addNote = async ( title, description, tag) => {
//  TODO : API Call

 let response = await fetch(`${host}/api/notes/addnote` , {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
      'auth-token': authToken
  },
  body: JSON.stringify({title ,description ,tag})
});
const note = await response.json();
setNotes(notes.concat(note))

// Add a new note
 }
  // Delete a Note
  
 const deleteNote = async (id) =>{

  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
    },
});
const json = response.json();
console.log(json);

   const newNotes = notes.filter((note)=>{return note._id !== id})
   setNotes(newNotes)
 }
  // Edit a Note
 const editNote = async (id, title, description, tag) => {
  // API Call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'auth-token': authToken
    },
    body: JSON.stringify({title,description,tag})
});
const json = await response.json();
console.log(json);

let newNotes = JSON.parse(JSON.stringify(notes))
  // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getnotes}}>{props.children}</NoteContext.Provider>
  )
}

export default NoteState;
