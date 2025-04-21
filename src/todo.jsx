import React, { useEffect, useState } from "react";
import "./todo.css";
import plus from "../src/assets/image/plus.png";
import edit from "../src/assets/image/edit.png";
import delet from "../src/assets/image/delete.png";
import round from "../src/assets/image/round.png";
import round_hollow from "../src/assets/image/roundhollow.png";

import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const Todo = () => {
  const [todolist, settodolist] = useState([]);
  const [addelement, setaddelement] = useState();
  const [indexToEdit, setIndexToEdit] = useState();

  const addList = () => {
    //validation

    if (!addelement) {
      alert("please add something");
      return;
    }

    if (indexToEdit) {
      //edit fucntion
      settodolist((prevTodo) =>
        prevTodo.map((item, index) =>
          index === indexToEdit ? { ...item, title: addelement } : item
        )
      );

    } else {
      // add function

      settodolist((prev) => [
        ...prev,
        { title: addelement, status: "To Do", isCompleted: false },
      ]);
      localStorage.setItem("data", JSON.stringify([...todolist, { title: addelement, status: "To Do", isCompleted: false }]));
    }
    setaddelement("");
  };

  const removeFromList = (title) => {
    settodolist(todolist?.filter((item) => item?.title !== title));
    localStorage.setItem("data", JSON.stringify((todolist?.filter((item) => item?.title !== title))));
    
  };

  const editfromlist = (index) => {
    setaddelement(todolist[index]?.title);
    setIndexToEdit(index);
  };
  const handleCompleteTask = (selectedIndex) => {
    settodolist((prevTodo) =>
      prevTodo.map((item, index) =>
        index === selectedIndex
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      )
    );
    // console.log(index)
  };
  useEffect(() => {
    // console.log(JSON.parse(localStorage.getItem("data")))
    localStorage.getItem("data") && settodolist(JSON.parse(localStorage.getItem("data")))
  }, []);

  return (
    <div>
      <div className="head">
        <div className="taskbar">
          <div className="tp">
            <p className="tp1">Task done</p>
            <p className="tp2">Keep it up</p>
          </div>
          <div className="partition">
            <p className="p1">
              {todolist?.filter((item) => item?.isCompleted == true).length}/
              {todolist.length}
            </p>
          </div>
        </div>
        <div className="search">
          <input
            onChange={(e) => setaddelement(e.target.value)}
            value={addelement}
            class="search_item"
            placeholder="  write your next task"
          ></input>
          <img className="sp" src={plus} onClick={() => addList()} />
        </div>
        {todolist.map((item, index) => (
          <div className="contents">
            <div className="static">
              {/* <img className="text"src={round} /> */}
              <img
                className="text"
                src={item.isCompleted == true ? round : round_hollow}
                onClick={() => handleCompleteTask(index)}
                width={27}
              />
              <p className="text">{item.title}</p>
            </div>

            <div className="edit">
              <MdEdit size={25} onClick={() => editfromlist(index)} />
              <MdOutlineDelete
                size={25}
                onClick={() => removeFromList(item.title)}
              />
            </div>
          </div>
        ))}

        {/* ,
        <div className="contents">
          <div className="static">
            <img className="text" src={round} />
            <p className="text">build a todo app</p>
          </div>
          <div className="edit">
            <MdEdit size={25} />
            <MdOutlineDelete size={25} />
          </div>
        </div>
        <div className="contents">
          <div className="static">
            <img className="text" src={round} />
            <p className="text"> build a todo app</p>
          </div>
          <div className="edit">
            <MdEdit size={25} />
            <MdOutlineDelete size={25} />
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Todo;
