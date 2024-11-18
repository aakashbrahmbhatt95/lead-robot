import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  contactFilterList: any;
};
const initialState = {
  contactFilterList: [],
} as InitialState;

export const ContactFilter = createSlice({
  name: "ContactFilter",
  initialState,
  reducers: {
    contactsFilterReducer: (state, action) => {
      state.contactFilterList = action.payload;
    },
  },
});

export const { contactsFilterReducer } = ContactFilter.actions;

export default ContactFilter.reducer;
