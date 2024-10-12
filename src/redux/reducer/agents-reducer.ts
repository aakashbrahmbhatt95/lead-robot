import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  ambientSoundsList: any;
  agentDataByID: any;
};
const initialState = {
  ambientSoundsList: [],
  agentDataByID: [],
} as InitialState;

export const Agents = createSlice({
  name: "Agents ",
  initialState,
  reducers: {
    agentListByIdReducer: (state, action) => {
      state.agentDataByID = action.payload;
    },
    ambientSoundsListReducer: (state, action) => {
      state.ambientSoundsList = action.payload;
    },
  },
});

export const { ambientSoundsListReducer, agentListByIdReducer } =
  Agents.actions;

export default Agents.reducer;
