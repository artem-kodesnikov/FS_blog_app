import { createSlice } from "@reduxjs/toolkit";

interface User {
  user: {
    id: string,
    username: string,
    displayname: string
  },
  // isUpdating: boolean,
  updateRow: string,
}

const initialState: User = {
  user: {
    id: '',
    username: '',
    displayname: '',
  },
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
      state.updateRow = action.payload[1];
    },
    changeUserData: (state: User, action) => {
      state.user = {...state.user, ...action.payload};
    }
  }
});

export const {
  getUserInfo,
  handleUserUpdate,
  changeUserData,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
