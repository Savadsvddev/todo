import React, { useEffect, useState } from "react";
import "./todo.css";

import edit from "../src/assets/image/edit.png";
import delet from "../src/assets/image/delete.png";

import Taskbar from "./taskbar";
import Search from "./search";
import Output from "./output";
import { useDispatch, useSelector } from "react-redux";
import {
  addToList,
  editList,
  removeFromListRedux,
  updateFromLocalStorage,
} from "./features/toDoList/toDoSlice";

const Todo = () => {
  const dispatch = useDispatch();

  // const todolist = []
  const todolist = useSelector((state) => state.toDoList.value);

  // const [todolist, settodolist] = useState([]);
  const [addelement, setaddelement] = useState();
  const [indexToEdit, setIndexToEdit] = useState();
  const [checkDate, setcheckDate] = useState();
  const [postDescription, setPostDescription] = useState();

  const addList = () => {
    //validation

    if (!addelement || !checkDate || !postDescription) {
      alert("please add something");
      return;
    }

    // alert(indexToEdit);
    if (indexToEdit || indexToEdit == 0) {
      //0,"",undefined, null
      //edit fucntion
      // settodolist((prevTodo) => {
      //   let arr = prevTodo.map((item, index) =>
      //     index === indexToEdit
      //       ? {
      //           ...item,
      //           title: addelement,
      //           date: checkDate,
      //           description: postDescription,
      //         }
      //       : item
      //   );

      //   // localStorage.setItem("data", JSON.stringify(arr));
      //   // alert(JSON.stringify(arr))
      //   return arr;
      // });
      dispatch(
        editList({
          itemIndex: indexToEdit,
          item: {
            title: addelement,
            date: checkDate,
            description: postDescription,
            status: "To Do",
            isCompleted: false,
          },
        })
      );
      setTimeout(() => setIndexToEdit(), 1000);
    } else {
      // add function

      // settodolist((prev) => [
      //   ...prev,
      //   {
      //     title: addelement,
      //     date: checkDate,
      //     description: postDescription,
      //     status: "To Do",
      //     isCompleted: false,
      //   },
      // ]);
      dispatch(
        addToList({
          title: addelement,
          date: checkDate,
          description: postDescription,
          status: "To Do",
          isCompleted: false,
        })
      );
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
    // settodolist(todolist?.filter((item, index) => indexToRemove !== index));
    dispatch(removeFromListRedux(indexToRemove))
    localStorage.setItem(
      "data",
      JSON.stringify(todolist?.filter((item, index) => indexToRemove !== index))
    );
  };

  const editfromlist = (index) => {
    // alert("here")
    console.log({ index }, todolist[index]?.title, todolist);
    setaddelement(todolist[index]?.title);
    setcheckDate(todolist[index]?.date);
    setPostDescription(todolist[index]?.description);
    setIndexToEdit(index);
  };
  const handleCompleteTask = (selectedIndex) => {
    // settodolist((prevTodo) =>
    //   prevTodo.map((item, index) =>
    //     index === selectedIndex
    //       ? { ...item, isCompleted: !item.isCompleted }
    //       : item
    //   )
    // );
    dispatch(updateFromLocalStorage(todolist.map((item, index) =>
      index === selectedIndex
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    )))
    // console.log(index)
  };
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("data")));
    localStorage.getItem("data") &&
      dispatch(
        updateFromLocalStorage(JSON.parse(localStorage.getItem("data")))
      );
  }, []);

  return (
    <div>
      <div className="head">
        {/* {count} */}
        <Taskbar todolist={todolist} />
        <Search
          addelement={addelement}
          checkDate={checkDate}
          postDescription={postDescription}
          addList={addList}
          setaddelement={setaddelement}
          setcheckDate={setcheckDate}
          setPostDescription={setPostDescription}
        />
        <Output
          todolist={todolist}
          handleCompleteTask={handleCompleteTask}
          editfromlist={editfromlist}
          removeFromList={removeFromList}
        />
      </div>
    </div>
  );
};
export default Todo;
