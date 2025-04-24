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
  const [checkDate, setcheckDate] = useState();
  const [postDescription, setPostDescription] = useState();

  const addList = () => {
    //validation

    if (!addelement||!checkDate||!postDescription) {
      alert("please add something");
      return;
    }

    // alert(indexToEdit);
    if (indexToEdit || indexToEdit == 0) {
      //0,"",undefined, null
      //edit fucntion
      settodolist((prevTodo) => {
        let arr = prevTodo.map((item, index) =>
          index === indexToEdit ? { ...item, title: addelement,date:checkDate,description:postDescription } : item
        );

        // localStorage.setItem("data", JSON.stringify(arr));
        // alert(JSON.stringify(arr))
        return arr;
      });
      setTimeout(() => setIndexToEdit(), 1000);
    } else {
      // add function

      settodolist((prev) => [
        ...prev,
        {
          title: addelement,
          date: checkDate,
          description: postDescription,
          status: "To Do",
          isCompleted: false,
        },
      ]);
      localStorage.setItem(
        "data",
        JSON.stringify([
          ...todolist,
          {
            title: addelement,
            date: checkDate,
            description: postDescription,
            status: "To Do",
            isCompleted: false,
          },
        ])
      );
    }
    setaddelement("");
    setcheckDate("");
    setPostDescription("");
  };

  const removeFromList = (indexToRemove) => {
    console.log(indexToRemove);
    settodolist(todolist?.filter((item, index) => indexToRemove !== index));
    localStorage.setItem(
      "data",
      JSON.stringify(todolist?.filter((item, index) => indexToRemove !== index))
    );
  };

  const editfromlist = (index) => {
    setaddelement(todolist[index]?.title);
    setcheckDate(todolist[index]?.date);
    setPostDescription(todolist[index]?.description);
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
    localStorage.getItem("data") &&
      settodolist(JSON.parse(localStorage.getItem("data")));
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
          <div className="title">
            <input
              onChange={(e) => setaddelement(e.target.value)}
              value={addelement}
              class="search_item"
              placeholder="Write your next task"
            ></input>
            <input
              className="date"
              type="date"
              placeholder="dd-mm-yy"
              onChange={(e) => setcheckDate(e.target.value)}
              value={checkDate}
            ></input>
          </div>

          <textarea
            className="discription"
            onChange={(e) => setPostDescription(e.target.value)}
            value={postDescription}
            type="text"
            placeholder="Description"
          ></textarea>
          <div className="sp_parant"  onClick={() => addList()} >
            <img className="sp" src={plus}/>
          </div>
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
            </div>
            <div className="notes">
              <p className="text_content_title">{item.title}</p>
              <p className="text_content_date">{item.date}</p>
              <p className="text_content_description">{item.description}</p>
              
            </div>

            <div className="edit">
              <MdEdit size={25} onClick={() => editfromlist(index)} />
              <MdOutlineDelete
                size={25}
                onClick={() => removeFromList(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Todo;
