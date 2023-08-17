import { Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./component/nav/navbar";
import Show from "./component/post/show";
import Login from "./component/nav/login";
import Sign from "./component/nav/sign";
import MyProfile from "./component/post/MyProfile";



// "email auth openid https://www.googleapis.com/auth/Userinfo.email https://www.googleapis.com/auth/Userinfo.auth https://www.googleapis.com/auth/User.addresses.read https://www.googleapis.com/auth/User.phonenumbers.read"

function App() {
  const [auth, setAuth] = useState(null);
 
  return (
    <div className="App">
      <Navbar />
   
      <Routes>
        <Route path="/" element={<Show/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Sign/>}/>
        <Route path="/myProfile" element={<MyProfile/>}/>
     
      </Routes>
     
    </div>
  );
}

export default App;
