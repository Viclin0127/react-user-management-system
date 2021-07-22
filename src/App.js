import React from "react";
import './App.css';
import Login from "./components/Login";
import {BrowserRouter} from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Login />
        <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;
