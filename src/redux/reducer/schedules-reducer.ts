import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  schedulesList: any;
};
const initialState = {
  schedulesList: [],
} as InitialState;

export const Schedules = createSlice({
  name: "Schedules",
  initialState,
  reducers: {
    schedulesListReducer: (state, action) => {
      state.schedulesList = action.payload;
    },
  },
});

export const { schedulesListReducer } = Schedules.actions;

export default Schedules.reducer;
