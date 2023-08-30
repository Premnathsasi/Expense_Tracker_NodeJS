/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import classes from "./Login.module.css";

const Login = () => {
  const [isError, setError] = useState("");
  const [errMsg, setErrMsg] = useState(false);

  const Navigate = useNavigate();

  const emailInput = useRef();
  const passwordInput = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const obj = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    try {
      const res = await axios
        .post("http://localhost:4000/user/login", obj)
        .then((res) => {
          console.log(res);
          alert(res.data.data);
        });
    } catch (err) {
      setErrMsg(true);
      console.log(err.response.data);
      setError(err.response.data.data);
    }
    setTimeout(() => {
      setErrMsg(false);
    }, 4000);

    emailInput.current.value = "";
    passwordInput.current.value = "";
  };

  return (
    <section className={classes.auth}>
      <div className={classes.main}>
        <h2>Sign In</h2>
        {errMsg && (
          <h4 style={{ textAlign: "center", color: "white" }}>{isError}</h4>
        )}
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <input
              type="email"
              id="email"
              required
              ref={emailInput}
              placeholder="Email"
              className="form-control"
            ></input>
          </div>
          <div className={classes.control}>
            <input
              type="password"
              id="password"
              required
              ref={passwordInput}
              placeholder="Password"
              className="form-control"
            ></input>
          </div>
          <div className={classes.actions}>
            <button>Sign In</button>
          </div>
        </form>
        <div className={classes.toggle}>
          Don't have an Account ?{" "}
          <a
            className={classes.anchor}
            onClick={() => {
              Navigate("/signup");
            }}
          >
            {" "}
            Sign Up
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
