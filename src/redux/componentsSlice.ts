import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ComponentsState {
  components: string[];
}

const initialState: ComponentsState = {
  components: [],
};

const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    addComponent: (state, action: PayloadAction<string>) => {
      state.components.push(action.payload);
    },
  },
});

export const { addComponent } = componentsSlice.actions;
export default componentsSlice.reducer;
