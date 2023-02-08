import { createSlice } from "@reduxjs/toolkit";

interface User {
  user: {
    username: string,
    displayname: string
  }
}

const initialState: User = {
  user: {
    username: '',
    displayname: '',
  }
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfo: (state: User, action) => {
      state.user = action.payload;
    }
  }
});

export const {
  getUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
