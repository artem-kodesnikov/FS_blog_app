import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { FormValues } from "../../pages/PersonalInfoPage";

interface User {
  user: {
    id: string,
    username: string,
    displayname: string
  },
  updateRow: string,
  isUpdating: boolean
}

const initialState: User = {
  user: {
    id: '',
    username: '',
    displayname: '',
  },
  updateRow: '',
  isUpdating: false
};

export const updateUserNameById = createAsyncThunk(
  'userInfo/updateUserNameById',
  async function (data: FormValues, { rejectWithValue }) {
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
    return data;
  }
);

export const updateDisplayNameById = createAsyncThunk(
  'userInfo/updateDipslayNameById',
  async function (data: FormValues, { rejectWithValue }) {
    const { id, displayname } = data;

    const request = {
      method: 'put',
      url: `http://localhost:5000/user/updateDisplayname/${id}`,
      data: { displayname }
    };
    const response = await axios(request);
    if (response.status !== 200) {
      rejectWithValue('Update error');
    }
    return data;
  }
);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfo: (state: User, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserNameById.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateUserNameById.fulfilled, (state, action) => {
        state.user = {...state.user, ...action.payload};
        toast.success('Username updated');
        state.isUpdating = false;
      })
      .addCase(updateUserNameById.rejected, (state) => {
        state.isUpdating = false;
      })

      .addCase(updateDisplayNameById.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateDisplayNameById.fulfilled, (state, action) => {
        state.user = {...state.user, ...action.payload};
        toast.success('Displayname updated');
        state.isUpdating = false;
      })
      .addCase(updateDisplayNameById.rejected, (state) => {
        state.isUpdating = false;
      });
  }
});

export const {
  getUserInfo,
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
