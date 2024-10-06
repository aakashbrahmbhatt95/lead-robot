import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  languageList: any;
};
const initialState = {
  languageList: [],
} as InitialState;

export const Globals = createSlice({
  name: "Globals",
  initialState,
  reducers: {
    languageListReducer: (state, action) => {
      state.languageList = action.payload;
    },
  },
});

export const { languageListReducer } = Globals.actions;

export default Globals.reducer;
