import React, {useContext} from 'react';
import Alertcontext from "../context/alert/Alertcontext";
// import NoteContext from "../context/notes/Notecontext";

export default function Alert() {
    const context = useContext(Alertcontext);
    const {alert} = context;
    // const context = useContext(NoteContext);
    // const {alert}= context;
    const capitalize = (text)=>
    {
        let typetext = text.toLowerCase();
        return typetext.charAt(0).toUpperCase()+typetext.slice(1)
    }
  return (
    
   alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
  <strong>{alert.message}</strong>
  
</div>
    
  );
}