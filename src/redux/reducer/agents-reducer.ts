import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  ambientSoundsList: any;
};
const initialState = {
  ambientSoundsList: [],
} as InitialState;

export const Agents = createSlice({
  name: "Agents ",
  initialState,
  reducers: {
    ambientSoundsListReducer: (state, action) => {
      state.ambientSoundsList = action.payload;
    },
  },
});

export const { ambientSoundsListReducer } = Agents.actions;

export default Agents.reducer;
