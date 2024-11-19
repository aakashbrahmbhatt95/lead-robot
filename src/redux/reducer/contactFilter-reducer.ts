import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  filterList: any;
  configFilterList: any;
  contactFilterList: any;
};
const initialState = {
  filterList: [],
  configFilterList: [],
  contactFilterList: [],
} as InitialState;

export const ContactFilter = createSlice({
  name: "ContactFilter",
  initialState,
  reducers: {
    filterReducer: (state, action) => {
      state.filterList = action.payload;
    },
    configFilterReducer: (state, action) => {
      state.configFilterList = action.payload;
    },
    contactFilterListReducer: (state, action) => {
      state.contactFilterList = action.payload;
    },
  },
});

export const { filterReducer, configFilterReducer, contactFilterListReducer } =
  ContactFilter.actions;

export default ContactFilter.reducer;
