import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Alertcontext from "../context/alert/Alertcontext";
// import NoteContext from "../context/notes/Notecontext";

const Login = () => {
  const alertcontext = useContext(Alertcontext);
  const {showalert} = alertcontext;
  // const context = useContext(NoteContext);
  // const {showalert}= context;
  const [credential,setcredential] = useState({email:"",password:""});
     let navigate = useNavigate();
    const handleSubmit = async (e)=>{

        e.preventDefault();
        console.log("handelsubmit is running...");
        // fetch("http://localhost:5000/api/auth/login")
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: 'POST', 
          
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email:credential.email,password:credential.password}) 
           
        });
        const json = await response.json();
        console.log(json);
        if(json.success)
        {
          localStorage.setItem('token', json.authtoken);
          navigate('/');
          showalert("success","Account logged in");
          console.log("success is true and ");
        }
        else{
          showalert("danger","Invalid Credential");

          console.log("success is false");
          

        }
    }

    const Onchange =(e)=>{
      setcredential({...credential,[e.target.name]:e.target.value})
     
  }
  return (
    <div className='my-4'>
      <h1 className='text-center'>Log In</h1>
    <form onSubmit={handleSubmit} className='my-4'>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credential.email} onChange={Onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={Onchange}/>
  </div>
  <div className="text-center">
  <button type="submit" className="btn btn-info">Login</button>
  </div>
</form>
    </div>
  );
}

export default Login;
