import { createSlice } from "@reduxjs/toolkit";

interface User {
  user: {
    id: string,
    username: string,
    displayname: string
  },
  isUpdating: boolean,
  updateRow: string,
}

const initialState: User = {
  user: {
    id: '',
    username: '',
    displayname: '',
  },
  isUpdating: true,
  updateRow: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfo: (state: User, action) => {
      state.user = action.payload;
    },
    handleUserUpdate: (state: User, action) => {
      state.isUpdating = action.payload[0];
      state.updateRow = action.payload[1];
    },
    changeUsername: (state: User, action) => {
      state.user.username = action.payload;
    }
  }
});

export const {
  getUserInfo,
  handleUserUpdate,
  changeUsername,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
