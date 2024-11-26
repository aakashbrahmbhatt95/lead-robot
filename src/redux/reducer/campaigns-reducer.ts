import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  campaignsList: any;
  campaignDataById: any;
  taskSetList: any;
  taskSetDataById: any;
  pathConditionList: any;
};
const initialState = {
  campaignsList: null,
  campaignDataById: {},
  taskSetList: [],
  taskSetDataById: {},
  pathConditionList: [],
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
    pathConditionListReducer: (state, action) => {
      state.pathConditionList = action.payload;
    },
  },
});

export const {
  campaignsListReducer,
  campaignDataByIdReducer,
  taskSetListReducer,
  taskSetDataByIdReducer,
  pathConditionListReducer,
} = Campaigns.actions;

export default Campaigns.reducer;
