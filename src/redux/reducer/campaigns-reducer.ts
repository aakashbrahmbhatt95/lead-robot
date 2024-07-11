import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  campaignsList: any;
  campaignDataById: any;
  taskSetList: any;
  taskSetDataById: any;
};
const initialState = {
  campaignsList: [],
  campaignDataById: {},
  taskSetList: [],
  taskSetDataById: {},
} as InitialState;

export const Campaigns = createSlice({
  name: "Campaigns",
  initialState,
  reducers: {
    campaignsListReducer: (state, action) => {
      state.campaignsList = action.payload;
    },
    campaignDataByIdReducer: (state, action) => {
      state.campaignDataById = action.payload;
    },
    taskSetListReducer: (state, action) => {
      state.taskSetList = action.payload;
    },
    taskSetDataByIdReducer: (state, action) => {
      state.taskSetDataById = action.payload;
    },
  },
});

export const {
  campaignsListReducer,
  campaignDataByIdReducer,
  taskSetListReducer,
  taskSetDataByIdReducer,
} = Campaigns.actions;

export default Campaigns.reducer;
