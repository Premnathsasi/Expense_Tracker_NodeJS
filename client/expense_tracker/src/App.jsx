/* eslint-disable no-unused-vars */
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/signUp";
import ExpenseForm from "./components/pages/ExpenseForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/expense" element={<ExpenseForm />} />
      </Routes>
    </>
  );
}

export default App;
