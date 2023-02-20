import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getUniqueComments } from "../../../../helpers/getUniqueComments";
import { getPostComments, postComment } from "../../../../network";
import {
  CommentRequestOption,
  CommentResponseInterface,
  PostCommentsRequestOption,
} from "../../../../types/types";

export interface CommentState {
  isLoading: boolean;
  error: SerializedError | null;
  data: Record<number, CommentResponseInterface>;
}

const initialState: CommentState = {
  data: {},
  error: null,
  isLoading: false,
};

// Fetch post commnets, create the thunk
export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (payload: CommentRequestOption) => {
    const response = await getPostComments(payload);
    return response;
  }
);

// Post commnet, create the thunk
export const postCommentByPostId = createAsyncThunk(
  "comments/postCommentByPostId",
  async (payload: PostCommentsRequestOption) => {
    const response = await postComment(payload);
    return response;
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        // Add comments to the state array
        const { postId } = action.payload.comments[0];
        const previousPostComments = state.data[postId] || {};

        const duplicateComments = [
          ...(previousPostComments.comments || []),
          ...action.payload.comments,
        ];

        const uniquesComments = getUniqueComments(duplicateComments, "id");

        state.data = {
          ...state?.data,
          [postId]: {
            ...previousPostComments,
            ...action.payload,
            comments: uniquesComments,
          },
        };
      });

    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postCommentByPostId.fulfilled, (state, action) => {
        // Add comments to the state array
        const { postId } = action.payload;
        const previousPostComments = state.data[postId] || {};

        const duplicateComments = [
          ...(previousPostComments.comments || []),
          action.payload,
        ];

        const uniquesComments = getUniqueComments(duplicateComments, "id");

        state.data = {
          ...state.data,
          [postId]: {
            ...previousPostComments,
            comments: uniquesComments,
          },
        };
      })
      .addCase(postCommentByPostId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postCommentByPostId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

// Action creators are generated for each case reducer function
// export * as counterSlice.actions;

export default commentSlice.reducer;
