import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/signUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
