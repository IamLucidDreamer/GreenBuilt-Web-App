import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";
import Login from "./Components/Common/Login";
import SignUp from "./Components/Common/SignUp";
import Home from "./Components/Main/Home";
import Dashboard from "./Components/Portals/Business/Pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
