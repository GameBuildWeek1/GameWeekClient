import React, { Component } from "react";
import Login from "./Login";
import Register from "./Register";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <h2>Welcome!</h2>
        <h2>Login</h2>
        <Login />
        <h2>Register</h2>
        <Register />
      </div>
    );
  }
}
