import React from "react";
import plus from "../src/assets/image/plus.png";

const Search = ({addelement,checkDate,postDescription,addList,setaddelement,setcheckDate,setPostDescription}) => {
    console.log({addelement})
  return (
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
      <div className="sp_parant" onClick={() => addList()}>
        <img className="sp" src={plus} />
      </div>
    </div>
  );
};
export default Search;
