import React, { useState, useEffect } from "react";
import { Route, Router as BrowserRouter, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"
import Map from "./components/Map"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("key")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  function toggleForm() {
    if (isLoggedIn) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }
  return (
    <div className="App">
      <h1>ESC'D</h1>
      {isLoggedIn ? (
        <div>
          <h2>Game Info</h2>

          <Route path="/game" component={Map}/>

        </div>
      ) : (
        <div>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      )}
    </div>
  );
}


export default App;
