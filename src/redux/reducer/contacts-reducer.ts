import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  contactsList: any;
};
const initialState = {
  contactsList: [],
} as InitialState;

export const Contacts = createSlice({
  name: "Contacts",
  initialState,
  reducers: {
    contactsListReducer: (state, action) => {
      state.contactsList = action.payload;
    },
  },
});

export const { contactsListReducer } = Contacts.actions;

export default Contacts.reducer;
