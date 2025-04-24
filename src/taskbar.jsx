import React from "react";
import Partition from "./partition";

const Taskbar = ({todolist,}) => {
  return (
    <div className="taskbar">
      <div className="tp">
        <p className="tp1">Task done</p>
        <p className="tp2">Keep it up</p>
      </div>
      <Partition todolist={todolist}/>
    </div>
  );
};
export default Taskbar;