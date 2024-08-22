import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./reducer/campaigns-reducer";
import contactReducer from "./reducer/contacts-reducer";
import attributeReducer from "./reducer/attributes-reducer";
import tagReducer from "./reducer/tags-reducer";
import componentsReducer from "./componentsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    campaignReducer,
    contactReducer,
    attributeReducer,
    tagReducer,
    components: componentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
