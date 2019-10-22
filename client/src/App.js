import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Map from "./components/Map";
import Landing from "./components/Landing";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/escape" component={Map} />
    </div>
  );
}

export default App;
