import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { HOST_URL } from "./utils";

function Login(props) {
  // const [isLogin, setLogin] = useState(false);
  const [userAcc, setUserAcc] = useState({ username: "", password: "" });
  // const [isLoading, SetIsLoading] =
  const handleLogin = e => {
    e.preventDefault();
    axios
      .post(`${HOST_URL}/api/login/`, userAcc)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("key", res.data.key);
        props.history.push('/game')
        window.location.reload()
      })
      .catch(error => {
        console.log("error logging in", error);
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
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={userAcc.username}
            onChange={loginChange}
          />

          <input
            type="text"
            name="password"
            placeholder="password"
            value={userAcc.password}
            onChange={loginChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
