import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  user: {
    id: string,
    username: string,
    displayname: string
  },
  updateRow: string,
}

interface UserData {
  id: string,
  username: string,
  displayname: string,
}

const initialState: User = {
  user: {
    id: '',
    username: '',
    displayname: '',
  },
  updateRow: '',
};

export const updateUserNameById = createAsyncThunk(
  'userInfo/updateUserNameById',
  async function (data: UserData, { rejectWithValue }) {
    const { id, username } = data;

    const request = {
      method: 'put',
      url: `http://localhost:5000/user/updateUsername/${id}`,
      data: { username }
    };
    const response = await axios(request);
    if (response.status !== 200) {
      rejectWithValue('Update error');
    }
    return response;
  }
);

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
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(updateUserNameById.pending, () => {
  //       // state.user.username = 'loading';
  //     })
  //     .addCase(updateUserNameById.fulfilled, (state, action) => {
  //       state.user = {...state.user, ...action.payload};
  //       state.user.username = 'username';
  //     })
  //     .addCase(updateUserNameById.rejected, (state) => {
  //       state.user.username = 'error';
  //     });
  // }
});

export const {
  getUserInfo,
  handleUserUpdate,
  changeUserData,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
