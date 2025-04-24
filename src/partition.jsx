import React from "react";
const Partition = ({todolist}) => {
  return (
    <div className="partition">
      <p className="p1">
        {todolist?.filter((item) => item?.isCompleted == true).length}/
        {todolist.length}
      </p>
    </div>
  );
};
export default Partition;