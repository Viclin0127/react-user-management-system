import React from "react";
import './App.css';
import Login from "./components/Login";
import {BrowserRouter} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GuideLine from "./components/GuideLine";

function App() {
  return (
    <BrowserRouter>
      <div className="header">
        <div>
          User Management System
        </div>
      </div>
      <div className="App">
        <Login />
        <Dashboard />
      </div>
      <GuideLine/>
    </BrowserRouter>
  );
}

export default App;
