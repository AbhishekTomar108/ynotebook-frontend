import React, {useState} from "react";
import Alertcontext from "./Alertcontext";

const Alert = (props) => {
  const [alert, setalert]=useState(null);

  const showalert =(type,message)=>{
    
    setalert({type:type,
              message:message
            })

    setTimeout(()=>{ 
           
            setalert(null);
        },2000);
        
        
}
  return (
    <Alertcontext.Provider value={{alert,showalert}}>
    {props.children}
    </Alertcontext.Provider>
  );
};

export default Alert;
