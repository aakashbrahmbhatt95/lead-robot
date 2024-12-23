import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  ambientSoundsList: any;
  realTimeModelsList: any;
  realTimeTranscriptionsList: any;
  realTimeResponseModalitiesList: any;
  realTimeTurnDetectionList: any;
  agentDataByID: any;
};
const initialState = {
  ambientSoundsList: [],
  realTimeModelsList: [],
  realTimeTranscriptionsList: [],
  realTimeResponseModalitiesList: [],
  realTimeTurnDetectionList: [],
  agentDataByID: null,
} as InitialState;

export const Agents = createSlice({
  name: "Agents ",
  initialState,
  reducers: {
    agentDataReducer: (state, action) => {
      state.agentDataByID = action.payload;
    },
    ambientSoundsListReducer: (state, action) => {
      state.ambientSoundsList = action.payload;
    },
    realTimeModelsListReducer: (state, action) => {
      state.realTimeModelsList = action.payload;
    },
    realTimeTranscriptionsListReducer: (state, action) => {
      state.realTimeTranscriptionsList = action.payload;
    },
    realTimeResponseModalitiesListReducer: (state, action) => {
      state.realTimeResponseModalitiesList = action.payload;
    },
    realTimeTurnDetectionListReducer: (state, action) => {
      state.realTimeTurnDetectionList = action.payload;
    },
  },
});

export const { ambientSoundsListReducer, realTimeTurnDetectionListReducer, realTimeResponseModalitiesListReducer, realTimeModelsListReducer, realTimeTranscriptionsListReducer, agentDataReducer } =
  Agents.actions;

export default Agents.reducer;
