import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
   const[auth,setAuth]=useAuth()
  //  console.log(auth)
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")


  const navigate = useNavigate()
 
  
  const onLogin = async (e) => {
    e.preventDefault();
  
    

    try {
   
      const response = await axios.post(
        "http://localhost:4500/auth/login",
        {
          email,
          password,
        }
      );
      // console.log(response)
      setAuth({
        ...auth,
        user:response.data.user,
        token:response.data.token,
      })  

      localStorage.setItem("userID", JSON.stringify(response.data));
      alert("Login succesfully");
      setEmail("")
      setPassword("")
      navigate("/myProfile")

    } catch (error) {
      console.log(error);
      alert("user not found !!!");
      navigate("/register");
      
    }
  };


  return (
    <div className='form_parent' >
      <form className='form' action="" onSubmit={onLogin}>
         <h2>Login</h2>

         <input required={true} type="text" placeholder='enter your email'  value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
         <input required={true} type="password" placeholder='enter your password' value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
         <button type='submit'>login</button>
          <p>don't have an account ? <Link to={"/register"} >sign up</Link></p>
      </form>
    </div>
   
  )
}

export default Login
