import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import About from "./components/About";
import  NoteState  from "./context/notes/NoteState";
import Alert from "./components/Alert";
function App() {
  // eslint-disable-next-line
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setAlert(null);
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}>
          </Route>
          <Route path="/about" element={<About />}>
          </Route>
          <Route path="/signup" element={<Signup showAlert={showAlert} />}>
          </Route>
          <Route path="/login" element={<Login showAlert={showAlert} />}>
          </Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
