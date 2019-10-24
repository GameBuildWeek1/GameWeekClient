import React, { useState, useEffect } from "react";
import { Route, Router as BrowserRouter, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"
import Map from "./components/Map"
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
    console.log('hello?', isLoginButton)
    // if (isLoginButton) {
    //   setIsLoginButton(true)
    //     // return <Login />
    // } else {
    //   setIsLoginButton(false)
    //     // return <Register />
    // }
    setIsLoginButton(!isLoginButton)
  }
  return (
    <div className="App">
      {/* <h1>ESC'D</h1> */}
      {isLoggedIn ? (
        <div>

         <Map />

        </div>
      ) : (
        <div>
          {
            isLoginButton ?( <Register />) : ( <Login /> )
          }
          <button onClick={e => toggleForm(e)}>
            {isLoginButton ? "Login":"Register"}
          </button>
        </div>
      )}
    </div>
  );
}


export default App;
