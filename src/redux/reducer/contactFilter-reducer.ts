import { initialContactFilterData } from "@/components/Segments/helper";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  filterList: any;
  configFilterList: any;
  contactFilterList: any;
  contactFilterData: any;
};
const initialState = {
  filterList: [],
  configFilterList: [],
  contactFilterList: [],
  contactFilterData: initialContactFilterData,
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
    contactFilterDataReducer: (state, action) => {
      state.contactFilterData = action.payload;
    },
  },
});

export const {
  filterReducer,
  configFilterReducer,
  contactFilterListReducer,
  contactFilterDataReducer,
} = ContactFilter.actions;

export default ContactFilter.reducer;
