import React, {useContext, useState} from "react";
import NoteContext from "../context/notes/Notecontext";

const Addnote = () => {
    const context = useContext(NoteContext);
    const {addNote}= context;

    const [note, setnote] = useState({title:"",description:"",tag:""})
    const Onhandle = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const Onchange =(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
        
    }
  return (
    <>
      <div className="container my-3">
        <h1>Add Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
             Title
            </label>
            <input
              type="text"className="form-control"id="title"name="title"aria-describedby="emailHelp"onChange={Onchange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"className="form-control"id="description"name="description"onChange={Onchange}
              minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
             Tag
            </label>
            <input
              type="text"className="form-control"id="tag"name="tag"onChange={Onchange}
            minLength={5} required/>
          </div>

          <button type="submit" className="btn btn-primary" onClick={Onhandle}>
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default Addnote;
