import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MyProfile = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState([]);
  console.log(user);

  const users = async () => {
    try {
      const { data } = await axios.get("http://localhost:4500/auth/get");
      // console.log(data)
      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    users();
  }, []);

  // console.log(auth)
  const navigate = useNavigate();

  const homeHandler = () =>{
   navigate("/")
  }

  const deleteAccount = async(_id) =>{
    await axios.delete(`http://localhost:4500/auth/delete/${_id}`)
    await setAuth({
      ...auth,
      user:null,
      token:"",
    })
    localStorage.removeItem("userID")
    navigate("/")
    alert(`Your account has been deleted !!`)
  }

  const logout = async () => {
    try {
      navigate("/");
      await setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("userID");
      
      alert("You are looged out !!");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="post_1">
      <div className="create_task_parent">
        {user.map(
          (u) =>
            u._id === auth.user._id && (
              <div key={u._id} className="create_task">
                {" "}
                <p>Name : {u.name}</p>
                <p>Email : {u.email}</p>
                <button onClick={homeHandler}>Go_Home</button>
                <button onClick={logout}>Logout</button>
                <button onClick={()=>deleteAccount(u._id)}>Delete account</button>
                
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MyProfile;
