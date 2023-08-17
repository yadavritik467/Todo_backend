import React, {  useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { useAuth } from "../../context/auth";
const Sign = () => {
  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[cpassword,setCpassword] = useState("")
  // const[passwordMatch,setPasswordMatch] = useState(false)

  

  const register = async(e) =>{
    e.preventDefault()
   try {
    if(password !== cpassword ){
      alert("password and confirm password should be same")
    }
    else{    
      

        const {data} =await axios.post("http://localhost:4500/auth/register",{
          name,email,password,cpassword
        })
        if(data.user){ 
          alert("user created successfully, Now login!!")
        }
        setName("")
        setEmail("")
        setPassword("")
        setCpassword("")
        
        
       
    }
   } catch (error) {
    console.error(error)
    alert("this user already exists")
  }
    
  }


 
    
  return (
    <div className='form_parent'>
         <form className='form' action="" onSubmit={register}>
        <h2> Register </h2>
        <input required={true} type="text" placeholder="enter your name" value={name} onChange={(e)=>setName(e.target.value)} /> <br />
        <input required={true} type="text" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
        <input required={true} type="password" placeholder="enter your password"value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
        <input required={true} type="password" placeholder="confirm password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} /> <br /> 

         <button type='submit'>Sign up</button>
          <p>Already have an account ? <Link to={"/login"} >Login</Link></p>
      </form>
        
     
    </div>
  );
};

export default Sign;
