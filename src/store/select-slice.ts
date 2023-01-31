import { createSlice } from "@reduxjs/toolkit";

import { sortList, tagList } from "../utils/nameList";

const initialState: { [name: string]: string } = {
  sort: sortList[0].id,
  filter: tagList[0].name,
  sugId: "",
};

const selectSlice = createSlice({
  name: "select",
  initialState: initialState,
  reducers: {
    changeSort(state, action) {
      state.sort = action.payload;
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    changeSug(state, action) {
      state.sugId = action.payload;
    },
  },
});

export const selectActions = selectSlice.actions;

export default selectSlice;
