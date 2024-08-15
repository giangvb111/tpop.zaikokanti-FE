import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import loadingReducer from "./future/loading-slice";
 
export const store = configureStore({
  reducer: {
    loadingReducer,
  },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
 
/*
  example use:
  import { AppDispatch, useAppSelector } from "@/redux/store";
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.authReducer.value); get user data from the store
  dispatch(login()); get action
*/