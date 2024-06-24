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
    deleteComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(
        (component) => component !== action.payload
      );
    },
  },
});

export const { addComponent, deleteComponent } = componentsSlice.actions;
export default componentsSlice.reducer;
