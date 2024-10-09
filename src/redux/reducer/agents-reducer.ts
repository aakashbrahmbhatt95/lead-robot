import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  ambientSoundsList: any;
  agentList: any;
};
const initialState = {
  ambientSoundsList: [],
  agentList: [],
} as InitialState;

export const Agents = createSlice({
  name: "Agents ",
  initialState,
  reducers: {
    agentListReducer: (state, action) => {
      state.agentList = action.payload;
    },
    ambientSoundsListReducer: (state, action) => {
      state.ambientSoundsList = action.payload;
    },
  },
});

export const { ambientSoundsListReducer, agentListReducer } = Agents.actions;

export default Agents.reducer;
