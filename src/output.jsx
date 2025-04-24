import React from "react";
import round from "../src/assets/image/round.png";
import round_hollow from "../src/assets/image/roundhollow.png";

import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const Output = ({ handleCompleteTask, removeFromList, editfromlist }) => {
  const todolist = useSelector((state) => state.toDoList.value);
  return (
    <div>
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
            <MdOutlineDelete size={25} onClick={() => removeFromList(index)} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Output;
