import React, { useState } from "react";

import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../../context/auth";
const Navbar = () => {
  const [auth, setAuth] = useAuth();
  // console.log(auth)


  const navigate = useNavigate()

 


  return (
    <div className="nav">
      <Link to={"/"}>ToDo List</Link>
     { auth.user !== null ? <Link to={"/myProfile"}>{auth.user.name}</Link> : <Link to={"/login"} >Login</Link>  }
    </div>
  );
};

export default Navbar;
