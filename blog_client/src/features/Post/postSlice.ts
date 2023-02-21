import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/requests";

interface Post {
  id?: string,
  title: string,
  content: string,
  url?: string,
  date: string,
  user: string,
}

interface Posts {
  posts: Post[],
  paginationPosts: Post[],
  isAdding: boolean,
  isLoading: boolean
}

const initialState: Posts = {
  posts: [],
  paginationPosts: [],
  isAdding: false,
  isLoading: false
};

export const createNewPost = createAsyncThunk(
  'post/createNewPost',
  async function (data: Post, { rejectWithValue }) {
    const { title, content, user, url } = data;

    const request = {
      method: 'post',
      url: BASE_URL.concat('/posts/createPost'),
      data: { title, content, user, url },
    };
    const response = await axios(request);
    if (response.status !== 200) {
      rejectWithValue('Update error');
    }
    return data;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setIsAdding: (state: Posts, action) => {
      state.isAdding = action.payload;
    },
    setAllPosts: (state: Posts, action) => {
      state.posts = action.payload;
    },
    setPaginationPosts: (state: Posts, action) => {
      state.paginationPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.paginationPosts = [action.payload, ...state.posts];
        toast.success('Post created!');
        state.isAdding = false;
        state.isLoading = false;
      });
  }
});

export const { setIsAdding, setAllPosts, setPaginationPosts } = postSlice.actions;

export default postSlice.reducer;
