import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Alertcontext from "../context/alert/Alertcontext";

const Signup = () => {
  const alertcontext = useContext(Alertcontext);
  const {showalert} = alertcontext;
  const [credential,setcredential] = useState({name:"",email:"",password:"",confirm_password:""});
  let navigate = useNavigate();
 const handleSubmit = async (e)=>{

     e.preventDefault();
     console.log("handelsubmit is running...");
     // fetch("http://localhost:5000/api/auth/login")
     if(credential.password===credential.confirm_password)
     {
     const response = await fetch("http://localhost:5000/api/auth", {
       method: 'POST', 
       
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password}) 
        
     });
     const json = await response.json();
     console.log(json);
     if(json.success)
     {
       localStorage.setItem('token', json.authtoken);
       navigate('/');
       showalert("success","Account Created Successfully");
       console.log("success is true");
     }
     else{
       console.log("success is false");
       showalert("danger","Sorry please check your details");
       

     }
 }
 else{
  console.log("password must be same");
 }
}
  const onChange =(e)=>{
    setcredential({...credential,[e.target.name]:e.target.value})
   
}
  return (
    <div className='my-4'>
    <h1 className='text-center'>Sign Up</h1>
    <form onSubmit={handleSubmit} className='my-4' >
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} />
   
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password"  onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirm_password" name="confirm_password"  onChange={onChange} />
  </div>
  <div className="text-center">
  <button type="submit" className="btn btn-info">Sign in</button>
  </div>
</form>
    </div>
  );
}

export default Signup;
