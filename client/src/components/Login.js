import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { HOST_URL } from "./utils";
import { Link} from "react-router-dom";

function Login(props) {
  // const [isLogin, setLogin] = useState(false);
  const [userAcc, setUserAcc] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("")

  // const [isLoading, SetIsLoading] =
  const handleLogin = e => {
    e.preventDefault();
    axios
      .post(`${HOST_URL}/api/login/`, userAcc)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("key", res.data.key);
        window.location.reload()
      })
      .catch(error => {
        console.log("error logging in", error);
        setMsg("INCORRECT USER/PASS", error)
      });
  };

  const loginChange = e => {
    setUserAcc({
      ...userAcc,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="wrapper">
      <div className="loginForm">
        <form className="form" onSubmit={handleLogin}>
          <h1>Welcome to ESC Dungeon</h1>
          <input className="formInput"
            type="text"
            name="username"
            placeholder="username"
            value={userAcc.username}
            onChange={loginChange}
          />

          <input className="formInput"
            type="password"
            name="password"
            placeholder="password"
            value={userAcc.password}
            onChange={loginChange}
          />
          {msg ? <p>{msg}</p> : null}
          <button type="submit">Login</button>
        </form>
        {/* <Link to="/register">Register</Link> */}
      </div>
    </div>
  );
}

export default withRouter(Login);
