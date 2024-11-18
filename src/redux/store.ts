import { configureStore } from "@reduxjs/toolkit";
import campaignReducer from "./reducer/campaigns-reducer";
import contactReducer from "./reducer/contacts-reducer";
import attributeReducer from "./reducer/attributes-reducer";
import tagReducer from "./reducer/tags-reducer";
import globalReducer from "./reducer/global-reducer";
import componentsReducer from "./componentsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import agentsReducer from "./reducer/agents-reducer";
import contactFilterReducer from "./reducer/contactFilter-reducer";
export const store = configureStore({
  reducer: {
    campaignReducer,
    contactReducer,
    attributeReducer,
    tagReducer,
    globalReducer,
    agentsReducer,
    contactFilterReducer,
    components: componentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
