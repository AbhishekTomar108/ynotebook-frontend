import React, {useContext, useEffect, useRef, useState} from 'react';
import NoteContext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem.js"
import Addnote from "./Addnote.js"
import { useNavigate } from "react-router-dom";

const Notes = () => {
  let navigate = useNavigate();
    const context = useContext(NoteContext);
    const {notes, getNote,editNote}= context;

    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
    useEffect(() => {
      return () => {
        if(localStorage.getItem('token')){
          console.log('getnote');
          getNote();
        }
        else{
          console.log('getnote nahi');
          navigate('/login');
        }

      };
    }, []);

    const updatenote = (currentnote)=>
    {
      ref.current.click();
      setnote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag});
    }
    const ref = useRef(null);
    const refClose = useRef(null);

    const Onhandle = (e)=>{
      e.preventDefault();
      refClose.current.click();
      console.log("updating note", note);
      editNote(note.id, note.etitle, note.edescription, note.etag);
  }

  const Onchange =(e)=>{
      setnote({...note,[e.target.name]:e.target.value})
     
  }
  return (
    <>
    <Addnote/>
   

    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
             Title
            </label>
            <input
              type="text"className="form-control"id="etitle"name="etitle" value={note.etitle} aria-describedby="emailHelp"onChange={Onchange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
            type="text"className="form-control"id="edescription"name="edescription" value={note.edescription}onChange={Onchange}
          minLength={5} required  />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
             Tag
            </label>
            <input
              type="text"className="form-control"id="etag"name="etag" value={note.etag}onChange={Onchange}
          minLength={5} required />
          </div>

          {/* <button type="submit" className="btn btn-primary" onClick={Onhandle}>
            Add Note
          </button> */}
        </form>
      </div>
      <div className="modal-footer">
        <button ref ={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={Onhandle}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row">
      <h2 className='my-3'>Your Note</h2>
          <div className="container">
      {notes.length===0 && "No Note to Display"}
      </div>
{notes.map((notes)=>{
  return <Noteitem key={notes._id} updatenote ={updatenote} notes={notes}/>;
 
})}
    </div>
    </>
  );
}

export default Notes;
