import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constent";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((Error) => console.log("App.jsx , useEffect Error: ", Error));
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateTask = () => {
    axios
      .patch(`${baseURL}/update/${updateId}`, { task: input })
      .then((res) => {
        console.log("update succeded", res.data);
        setUpdateUI((prevState) => !prevState);
        setUpdateId(null);
        setInput("");
      })
      .catch((err) => {
        console.log("update datasi", err);
      });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  return (
    <main className=" flex items-center justify-center h-full w-screen">
      <div className=" justify-items-center h-[50%] w-[35%] ">
        <h1 className="title text-center m-4">Crud Operator </h1>
        <div className=" input_holder p-4">
          <input
            className="border-2 m-3 border-black"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={updateId ? updateTask : addTask} type="submit">
            {updateId ? "Update task" : "Add task"}
          </button>
        </div>
        <ul>
          {tasks.map((task) => (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              setUpdateUI={setUpdateUI}
              updateMode={updateMode}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
