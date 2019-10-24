import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Link} from "react-router-dom";
function Login(props) {
  // const [isLogin, setLogin] = useState(false);
  const [userAcc, setUserAcc] = useState({ username: "", password: "" });
  // const [isLoading, SetIsLoading] =
  const handleLogin = e => {
    e.preventDefault();
    axios
      .post("https://build-week-game-server.herokuapp.com/api/login/", userAcc)
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
      <h1>ESC'D</h1>
      <div className="loginForm">
        <form className="form" onSubmit={handleLogin}>
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
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default withRouter(Login);
