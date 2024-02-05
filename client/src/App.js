import React, { useState, createContext } from "react";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Events from "./components/Events";
import LoginRegister from "./components/LoginRegister";
import Profile from "./components/Profile"; 
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Auth from "./auth/Auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

function App() {
  const [token, setToken] = useState(Cookies.get('token') || null);

  const updateToken = (newToken) => {
    if (newToken) {
      Cookies.set('token', newToken, { expires: 7 });
      setToken(newToken);
    } else {
      Cookies.remove('token');
      setToken(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AuthContext.Provider value={{ token, setToken: updateToken }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister page={"Login"} />} />
            <Route path="/register" element={<LoginRegister page={"Register"} />} />
            <Route path='/events' element={<Auth><Events /></Auth>} />
            <Route path='/profile' element={<Auth><Profile /></Auth>} />
          </Routes>
        </AuthContext.Provider>
      </header>
    </div>
  );
}

export default App;
