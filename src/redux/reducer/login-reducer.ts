import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  login: any;
};
const initialState = {
    login: null,
} as InitialState;

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginReducer: (state:any, action:any) => {
      state.login = action.payload;
    },
  },
});

export const {
    loginReducer,
} = login.actions;

export default login.reducer;
