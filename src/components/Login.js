import React, { useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

const Login = (props) => {
  const [formValues, setFormValues] = useState({
    username:"",
    password: ""
  })

  const [error, setError] = useState("")
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post("/login", formValues)
      .then(res => {
        localStorage.setItem("token",
         res.data.payload)
        console.log("Logged In")
        props.history.push("/BubblePage")
      })
      .catch(err => {
        setError(<p>"Username or Password not valid." </p>)
        console.log(err)
      })
  }
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <input 
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={formValues.username}
          onChange={handleChange}
          />
          <input 
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={formValues.password}
          onChange={handleChange}
          />
          <button id="submit">Login</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};
export default Login;
//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"