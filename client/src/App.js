// import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/signup" element={<SignUp/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
