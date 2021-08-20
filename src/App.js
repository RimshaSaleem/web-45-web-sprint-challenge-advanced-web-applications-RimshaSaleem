import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import axiosWithAuth from "./helpers/axiosWithAuth";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App() {
  const handleLogout = () => {
    axiosWithAuth().post("/logout")
      .then(res => {
        console.log("Logged Out", res)
        localStorage.removeItem("token");
        window.location.href = "http://localhost:3000/"
      })
     
      .catch(err => console.log(err))
      
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