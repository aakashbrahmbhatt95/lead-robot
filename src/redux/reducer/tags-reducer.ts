import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  tagsList: any;
};
const initialState = {
  tagsList: [],
} as InitialState;

export const Tags = createSlice({
  name: "Tags",
  initialState,
  reducers: {
    tagsListReducer: (state, action) => {
      state.tagsList = action.payload;
    },
  },
});

export const { tagsListReducer } = Tags.actions;

export default Tags.reducer;
