import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../api/requests";

interface Post {
  _id?: string,
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
    console.log(response.data);
    if (response.status !== 200) {
      rejectWithValue('Creating post error');
    }
    return response.data;
  }
);

export const deletePostById = createAsyncThunk(
  'post/deletePost',
  async function (id: string | undefined, { rejectWithValue }) {
    console.log(id);
    const request = {
      method: 'delete',
      url: BASE_URL.concat('/posts/deletePost'),
      data: { id },
    };
    const response = await axios(request);
    if (response.status !== 200) {
      rejectWithValue('Delete error');
    }
    return id;
  }
);

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

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
        state.paginationPosts = [action.payload, ...state.paginationPosts];
        toast.success('Post created!');
        state.isAdding = false;
        state.isLoading = false;
      })
      .addCase(deletePostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.paginationPosts = state.paginationPosts.filter(post => post._id !== action.payload);
        state.isLoading = false;
        toast.success('Post deleted!');
      })
      .addMatcher(isError, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setIsAdding, setAllPosts, setPaginationPosts } = postSlice.actions;

export default postSlice.reducer;
