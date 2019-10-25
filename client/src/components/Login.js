import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { HOST_URL } from "./utils";

function Login(props) {
  const [userAcc, setUserAcc] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    axios
      .post(`${HOST_URL}/api/login/`, userAcc)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("key", res.data.key);
        window.location.reload();
      })
      .catch(error => {
        console.log("error logging in", error);
        setMsg("INCORRECT USER/PASS", error);
      });
  };

  const loginChange = e => {
    setUserAcc({
      ...userAcc,
      [e.target.name]: e.target.value
    });
  };
  console.log(msg);
  return (
    <div className="wrapper">
      <div className="loginForm">
        <form className="form" onSubmit={handleLogin}>
          <h1>Welcome to ESC Dungeon</h1>
          <input
            className="formInput"
            type="text"
            name="username"
            placeholder="username"
            value={userAcc.username}
            onChange={loginChange}
            stype={{minWidth: "200px"}}
          />

          <input
            className="formInput"
            type="password"
            name="password"
            placeholder="password"
            value={userAcc.password}
            onChange={loginChange}
          />
          <div style={{minWidth: "200px", minHeight: "30px", maxHeight: "30px", maxWidth: "200px"}}>
          {msg}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
