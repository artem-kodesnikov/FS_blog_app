import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/requests";

interface User {
  user: {
    id: string,
    username: string,
    displayname: string
  },
  updatingRow: string,
  isUpdating: boolean
}

const initialState: User = {
  user: {
    id: '',
    username: '',
    displayname: '',
  },
  updatingRow: '',
  isUpdating: false
};

export const updateUserNameById = createAsyncThunk(
  'userInfo/updateUserNameById',
  async function (data: any, { rejectWithValue }) {
    const { id, username } = data;

    const request = {
      method: 'put',
      url: `${BASE_URL}/user/updateUsername/${id}`,
      data: { username }
    };
    try {
      const response = await axios(request);
      console.log(response);
      if (response.status !== 200) {
        return rejectWithValue('Error');
      }
      return data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateDisplayNameById = createAsyncThunk(
  'userInfo/updateDipslayNameById',
  async function (data: any, { rejectWithValue }) {
    const { id, displayname } = data;

    const request = {
      method: 'put',
      url: `${BASE_URL}/user/updateDisplayname/${id}`,
      data: { displayname }
    };
        try {
          const response = await axios(request);
          console.log(response);
          if (response.status !== 200) {
            return rejectWithValue('Error');
          }
          return data;
        } catch (error) {
          console.log(error.response.data.message);
          return rejectWithValue(error.response.data.message);
        }
  }
);

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfo: (state: User, action) => {
      state.user = action.payload;
    },
    setUpdatingRow: (state, action) => {
      state.updatingRow = action.payload;
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
      .addCase(updateDisplayNameById.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateDisplayNameById.fulfilled, (state, action) => {
        state.user = {...state.user, ...action.payload};
        toast.success('Displayname updated');
        state.isUpdating = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.isUpdating = false;
        toast.error(action.payload);
      });
  }
});

export const {
  getUserInfo,
  setUpdatingRow
} = userInfoSlice.actions;

export default userInfoSlice.reducer;
