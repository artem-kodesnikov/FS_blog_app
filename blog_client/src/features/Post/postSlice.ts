import { createSlice } from "@reduxjs/toolkit";

interface Post {
  isAdding: boolean,
}

const initialState: Post = {
  isAdding: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setIsAdding: (state: Post, action) => {
      state.isAdding = action.payload;
    }
  }
});

export const { setIsAdding } = postSlice.actions;

export default postSlice.reducer;
