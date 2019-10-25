import React, { useState, useEffect } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Map from "./components/Map";
import AboutGame from "./components/AboutGame";
import AboutTeam from "./components/AboutTeam";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginButton, setIsLoginButton] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("key")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  function toggleForm() {
    console.log("hello?", isLoginButton);
    setIsLoginButton(!isLoginButton);
  }
  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <Map />
        </div>
      ) : (
        <div>
          <AboutGame />
          {isLoginButton ? <Register /> : <Login />}
          <AboutTeam />
          <button onClick={e => toggleForm(e)}>{isLoginButton ? "Login" : "Register"}</button>
        </div>
      )}
    </div>
  );
}

export default App;
