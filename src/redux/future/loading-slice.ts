import { createSlice } from "@reduxjs/toolkit";
 
type InitialState = {
  value: LoadingState;
};
 
type LoadingState = {
  isLoading: boolean;
 
};
 
const initialState: InitialState = {
  value: {
    isLoading: false,
  } as LoadingState,
};
 
export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    hiddenLoading: () => {
      return initialState;
    },
    showLoading: () => {
      return {
        value: {
          isLoading: true,
        },
      };
    },
  },
});
 
export const { hiddenLoading, showLoading } = loading.actions;
export default loading.reducer;