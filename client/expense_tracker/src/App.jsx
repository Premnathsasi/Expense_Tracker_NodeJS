/* eslint-disable no-unused-vars */
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/signUp";
import ExpenseForm from "./components/pages/ExpenseForm";
import Header from "./components/pages/Header";

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticate);

  return (
    <>
      {auth && <Header />}
      <Routes>
        {!auth && <Route path="/" element={<Login />} />}
        <Route path="/signup" element={<SignUp />} />
        {auth && <Route path="/expense" element={<ExpenseForm />} />}
        {!auth ? (
          <Route path="*" element={<Navigate to="/" />} />
        ) : (
          <Route path="*" element={<Navigate to="/expense" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
