import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
});

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "",description: "",tag: ""})
    props.showAlert("added note successfully","success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>

    {/* select box for tag */}
    <label htmlFor="tag" className="form-label">tag : </label>
      <select className="form-select" name="tag" value={note.tag}  id="tag" onChange={onChange}>
        <option defaultValue="General">General</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Life">Life</option>
        <option value="Travel">Travel</option>
      </select>

      {/* input field for title  */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          title
        </label>
        <input
          type="text"
          className="form-control"
          onChange={onChange}
          name="title"
          id="title"
          value={note.title}
          placeholder="title" minLength={5} required
        />
      </div>

      {/* input field for description  */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          onChange={onChange}
          name="description"
          value={note.description}
          rows="3" minLength={5} required
        ></textarea>
      </div>
      <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </div>
  );
};

export default AddNote;
