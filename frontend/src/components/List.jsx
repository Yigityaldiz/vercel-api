import React from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { baseURL } from "../utils/constent";

export default function List({ id, task, setUpdateUI, updateMode }) {
  const removeTask = () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDeletion) {
      axios
        .delete(`${baseURL}/delete/${id}`)
        .then((response) => {
          console.log("silindi", response);
          // Trigger a re-render or any other necessary action
          setUpdateUI((prev) => !prev);
        })
        .catch((err) => console.log("Silme islemi yapilamadi", err));
    }
  };

  return (
    <li className="flex p-3 ">
      {/* {task} */}
      <div className="icon_holder flex w-[100%]">
        <p className="p-4 w-[90%]">{task}</p>
        <BiEditAlt
          onClick={()=> updateMode(id, task)}
          className="h-[100%] w-[8%] icon fa-home cursor-pointer"
        />
        <BsTrash
          onClick={removeTask}
          className="h-[100%] w-[8%]  icon fa-home cursor-pointer "
        />
      </div>
    </li>
  );
}
