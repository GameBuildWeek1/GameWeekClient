import React, { useState, useEffect } from "react";
//import { Route } from "react-router-dom";
import Login from '../src/components/Login'
import Register from '../src/components/Register'
function App() {

  const[isLoggedIn, setIsLoggedIn] = useState (false)

  return (
    <div className="App">
      <h2>Welcome!</h2>
      <h2>Login</h2>
      <Login />
      <h2>Register</h2>
      <Register />
    </div>
  )
}

export default App;
