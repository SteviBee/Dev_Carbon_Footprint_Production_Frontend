import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import RoutesBar from "./RoutesBar"
import CarbonApi from "./Api"
import UserContext from "./userContext"
import useLocalStorage from "./hooks/useLocalStorage";
import jwt from "jsonwebtoken";

// Main App holds the highest level states
function App() {
  const [curUser, setCurUser] = useState(null);
  // const [token, setToken] = useState("");
  const [token, setToken] = useLocalStorage();  



  // User API Call to grab data. Dependency: Token. Will grab user data from DB
  useEffect(() => {
    async function getUser() {      
      if (token) {
        try {
          let { username } = jwt.decode(token)
          let user = await CarbonApi.getOneUser(username)
          setCurUser(user)

        } catch (error) {
          console.log("User loading error:", error);
        }
      }
    };
    getUser()
  }, [token]);

  // Signup Function = Takes Userdata -> returns: token if user successfully added
  const signUpUser = async (formData) => {
    try {
      let res = await CarbonApi.signUp(formData)
      // setCurUser(formData.username)
      setToken(res)
      // useLocalStorage("SET", res)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // Login Function = Takes Userdata / password -> validateds -> returns: token if correct auth
  const loginUser = async (formData) => {
    try {
      let res = await CarbonApi.login(formData)
      // setCurUser(formData.username)
      setToken(res)
      // useLocalStorage("SET", res)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  // Logout:
  const logout = () => {
    setCurUser(null);
    setToken(null);
  }
  
 

  return (
    <div className="App">
      
      <UserContext.Provider value={{ curUser, setCurUser, signUpUser, loginUser, logout }}>
        <BrowserRouter>
          <NavBar />
          <RoutesBar />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
