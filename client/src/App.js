import React, { useState, useEffect } from "react";
//import { Route } from "react-router-dom";
import Login from '../src/components/Login'
import Register from '../src/components/Register'
import Map from './components/Map'
function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('key')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])
  return (
    <div className="App">
      <h2>Welcome!</h2>
      {isLoggedIn ?
       (
        <div>
        <h2>Game Info</h2>
        <Map />
      </div>


       ) : (
        
        <div>
        <h2>Login</h2>
          <Login />
        <h2>Register</h2>
          <Register />
       </div>
       )}

    </div>
  )
}

export default App;
