import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar.js";
import NoteState from "./context/notes/Notestates";
import Alert from "./components/Alert";
import Alertstate from "./context/alert/Alertstate";

import {
  // BrowserRouter as Router,

  HashRouter,
  Route,
  Routes,
  // Link
} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  let username = process.env.REACT_APP_USER_NAME;
  let password = process.env.REACT_APP_USER_PASSWORD;
  let database = process.env.REACT_APP_USER_DATABASE;
  console.log("username= ",username);
  return (
    <>
  
         <Alertstate>
      <NoteState>
        <HashRouter>
          <Navbar />
         
          <Alert/>
         
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About username={username} password={password} database={database}/>}/>
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </HashRouter>
      </NoteState>
        </Alertstate>
    </>
  );
}

export default App;
