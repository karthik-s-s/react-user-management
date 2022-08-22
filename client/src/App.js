import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import Quote from "./components/Quote";
import Ahome from "./components/admin-home/Ahome";
import Admin_login from "./components/admin-login/Admin_login";
import Edit from "./components/Edit-user/Edit";
import UserContext from "./comtext/UserContext";
import Adduser from "./adduser/Adduser";

function App() {
  return (
    <div className="App">
      <UserContext>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/admin-login" element={<Admin_login />} />
          <Route path="/admin-home" element={<Ahome />} />
          <Route path="/edit-user" element={<Edit />} />
          <Route path="/add-user" element={<Adduser />} />
        </Routes>
      </UserContext>
    </div>
  );
}

export default App;
