import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  languageList: any;
  taskActionList: any;
};
const initialState = {
  languageList: [],
  taskActionList: [],
} as InitialState;

export const Globals = createSlice({
  name: "Globals",
  initialState,
  reducers: {
    languageListReducer: (state, action) => {
      state.languageList = action.payload;
    },
    taskActionReducer: (state, action) => {
      state.taskActionList = action.payload;
    },
  },
});

export const { languageListReducer, taskActionReducer } = Globals.actions;

export default Globals.reducer;
