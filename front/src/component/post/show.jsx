import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { set } from "mongoose";

const Show = () => {
  const [auth] = useAuth();

  const [load, setLoad] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState([
    // { _id: "1", name: "rk", title: "play", task: "im playing" },
    // { _id: "2", name: "mk", title: "danc", task: "im dancing" },
  ]);

  // console.log(message.length);
  // console.log(user)

  const getAllPosts = async () => {
    try {
      setDataLoad(true);
      const { data } = await axios.get("http://localhost:4500/post/get");
      setMessage(data.text);
      setDataLoad(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // ---------------------------------------------------------------- creating post

  const create = async (e) => {
    e.preventDefault();
    try {
      if (auth.user === null) {
        alert("please login ");
      } else {
        setLoad(true);
      await axios.post("http://localhost:4500/post/post", {
        title,
        task,
        user: auth.user._id,
      });
      setTitle("");
      setTask("");
      setLoad(false);
      getAllPosts();
      alert("task created");
      }
    } catch (error) {
      console.log(error.message);
      setLoad(false)
    }
  };

  // ---------------------------------------------------------------- editing post

  const editHandler = async () => {
    setUpdateLoad(true);
    const { data } = await axios.put(`http://localhost:4500/post/edit/${id}`, {
      title,
      task,
    });
    setTitle("");
    setTask("");
    setUpdateLoad(false);
    if (data) {
      alert(data.message);
      setEditModal(false);
      // setMessage(data.text);
      getAllPosts();
    }
    // console.log(_id);
  };

  const openModal = (_id) => {
    setEditModal(true);
    setId(_id);
    // console.log(_id);
  };

  // ---------------------------------------------------------------- deleting post

  const deleteHandler = async (_id) => {
    try {
      await axios.delete(`http://localhost:4500/post/delete/${_id}`);

      getAllPosts();
    } catch (error) {
      console.log(error.message);
    }

    // console.log(_id);
  };

  // let name = localStorage.getItem("userID") ? auth.user.name :auth.user
  return (
    <div className="post">
      <div className="create_task_parent">
        <form onSubmit={create} className="create_task">
          <h2>Create your task</h2>
          <input
            required={true}
            type="text"
            placeholder="write your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            required={true}
            placeholder="write your task here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button type="submit">
            {" "}
            {load === true ? "Loading . . ." : "Add task"}{" "}
          </button>
        </form>
      </div>

      {dataLoad === true
        ? "Loading"
        : message.map((m) => (
            <div key={m._id} className="allTask">
              {/* {m.user === undefined && <p style={{color:"white"}}>Your task collections are empty . . .</p> } */}
              {auth.user !== null && m.user === auth.user._id  ? (<div>
                <h2 style={{ textAlign: "center", color: "white " }}>
                  {" "}
                  All tasks
                </h2>
                <p>Created by : {auth.user.name} </p>
                <p>Title : {m.title} </p>
                <p>task : {m.task} </p>
                <button onClick={() => openModal(m._id)}>Edit</button>
                {editModal === true && m._id === id ? (
                  <div className="editModal">
                    <input
                      required={true}
                      type="text"
                      placeholder="edit your title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                      required={true}
                      type="text"
                      placeholder="edit your task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
                    <div>
                      <button onClick={editHandler}>
                        {" "}
                        {updateLoad === true ? "update . . ." : "update"}{" "}
                      </button>
                      <button onClick={() => setEditModal(false)}>
                        {" "}
                        cancle
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => deleteHandler(m._id)}>Delete</button>
                )}
              </div>) : ( null )}
              
            </div>
          ))}
    </div>
  );
};

export default Show;
