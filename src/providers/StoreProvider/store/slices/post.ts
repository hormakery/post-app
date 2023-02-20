import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getPosts } from "../../../../network";
import {
  PostRequestOption,
  PostResponseInterface,
} from "../../../../types/types";

export interface PostState extends PostResponseInterface {
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: PostState = {
  skip: 0,
  total: 0,
  posts: [],
  limit: 10,
  error: null,
  isLoading: false,
};

// Fetch post commnets, create the thunk
export const fetchAllPosts = createAsyncThunk(
  "comments/fetchAllPosts",
  async (payload: PostRequestOption) => {
    const response = await getPosts(payload);
    return response;
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        // Add comments to the state array
        state.isLoading = false;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
        state.limit = action.payload.limit;
        state.posts = state.posts.concat(action.payload.posts);
      });
  },
});

// Action creators are generated for each case reducer function
// export * as counterSlice.actions;

export default postSlice.reducer;
