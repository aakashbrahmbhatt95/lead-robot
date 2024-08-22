import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  attributesList: any;
};
const initialState = {
  attributesList: [],
} as InitialState;

export const Attributes = createSlice({
  name: "Attributes",
  initialState,
  reducers: {
    attributesListReducer: (state, action) => {
      state.attributesList = action.payload;
    },
  },
});

export const { attributesListReducer } = Attributes.actions;

export default Attributes.reducer;
