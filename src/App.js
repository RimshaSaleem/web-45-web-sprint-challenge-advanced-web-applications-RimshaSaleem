import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

import PrivateRoute from "./components/PrivateRoute";
import axiosWithAuth from "./helpers/axiosWithAuth";

function App() {
  const handleLogout = () => {
    axiosWithAuth().post("/logout")
    .then(response => {
    console.log("You're Logged Out", response)
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/"
      })
     
      .catch(error => console.log(error))
      
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a onClick={handleLogout}data-testid="logoutButton" href="#">logout</a>
        </header> 


        <Switch>
          <PrivateRoute exact path="/protected" component={BubblePage}/>
          <Route exact path="/" component={Login} />
        </Switch>  
      </div>
    </Router>
  );
}

export default App;
//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.