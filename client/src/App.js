import React, { useState, createContext } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Info from "./components/Info";
import LoginRegister from "./components/LoginRegister";
import Users from "./components/Users"; 
import { Routes, Route, Navigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Auth from "./auth/Auth";

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AuthContext.Provider value={{ token, setToken }}>
          <div className="App">
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginRegister page={"Login"} />} />
              <Route
                path="/register"
                element={<LoginRegister page={"Register"} />}
              />
              <Route path='/info' element={<Auth><Info /></Auth>} />
              <Route path='/users' element={<Auth><Users /></Auth>} />
            </Routes>
          </div>
        </AuthContext.Provider>
      </header>
    </div>
  );
}

export default App;
