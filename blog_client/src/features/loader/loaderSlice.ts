import { createSlice } from "@reduxjs/toolkit";

interface Loader {
  isLoading: Boolean,
}

const initialState: Loader = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    changeStateLoader: (state: Loader, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const {
  changeStateLoader,
} = loaderSlice.actions;

export default loaderSlice.reducer;
