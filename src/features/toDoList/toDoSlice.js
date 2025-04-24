import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const toDoSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {
    addToList: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    editList: (state, action) => {
      let arr = state.value.map((item, index) =>
        index === action.payload.itemIndex ? action.payload.item : item
      );
      localStorage.setItem("data", JSON.stringify(arr));
      state.value = [...arr];
    },
    removeFromListRedux: (state, action) => {
      // console.log({itemIndex})
      state.value = state.value?.filter(
        (ele, index) => index !== action.payload
      );
    },
    updateFromLocalStorage: (state, action) => {
      localStorage.setItem("data", JSON.stringify(action.payload));
      state.value = [...action.payload];
    },
  },
});

export const {
  addToList,
  editList,
  removeFromListRedux,
  updateFromLocalStorage,
} = toDoSlice.actions;
export default toDoSlice.reducer;
