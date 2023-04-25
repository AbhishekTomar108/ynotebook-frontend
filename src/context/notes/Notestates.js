
import NoteContext from "./Notecontext";
import Alertcontext from "../alert/Alertcontext";
import {useState,useContext} from "react";

const NoteState  = (props)=>
{
  const alertcontext = useContext(Alertcontext);
  const {showalert} = alertcontext;
  const host ="http://localhost:5000";
   const notesInitial =[ ]

  const [notes, setnotes] = useState(notesInitial);

  // get all notes
  const getNote= async ()=>{
    //  api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      
      
    });
    const json  = await response.json();
     console.log(json);
     setnotes(json);
  
  }

  //Add note
  const addNote= async (title,description,tag)=>{
    // todo api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', 
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      
      body: JSON.stringify({title,description,tag}) 
    });
    const json = await response.json();
  // const json =response.json(); 
    console.log("adding a note");
   const note= json;
   showalert("success","Note Added Successfully"); 
    setnotes(notes.concat(note));
  }

  //Delete the note
   // todo api call
  const deleteNote= async (id)=>{
    console.log("deleting with id is "+id);
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE', 
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
     
     
    });
    const json = await response.json();
    console.log(json);
    showalert("success","Note Deleted Successfully"); 
    const Newnotes = notes.filter((note)=>{return note._id!==id});
    setnotes(Newnotes);
  }

  //Edit the note
   // todo api call
  const editNote= async (id, title, description, tag)=>{
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT', 
      
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      
      body: JSON.stringify({title,description,tag}) 
    });
    
  const json =await response.json();
 let Newnote = JSON.parse(JSON.stringify(notes));
    for(let index=0; index<Newnote.length; index++){
     const element = Newnote[index];
    if(element._id===id)
    {
      Newnote[index].title = title;
      Newnote[index].description = description;
      Newnote[index].tag = tag;
      break;
    }
  }
  showalert("success","Note Updated Successfully"); 
  setnotes(Newnote);
  
}

    return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote,getNote}}>
    {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;