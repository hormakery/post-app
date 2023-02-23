import {
  createSlice,
  SerializedError,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getRandomPostUser } from "../../../../network";
import { UserInterface } from "../../../../types/types";

export interface UserState {
  isLoading: boolean;
  user: UserInterface | null;
  error: SerializedError | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  isLoading: false,
};

// Fetch app user, create the thunk
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const MAX_NUMBER = 9999;
  const userId = Math.floor(Math.random() * 100);
  const noOfPosts = Math.floor(Math.random() * MAX_NUMBER);
  const noOfFollowers = Math.floor(Math.random() * MAX_NUMBER);
  const noOfSubscriptions = Math.floor(Math.random() * MAX_NUMBER);
  const response = await getRandomPostUser(userId);

  return { ...response, noOfPosts, noOfFollowers, noOfSubscriptions };
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // Add user to the state
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
// export * as counterSlice.actions;

export default userSlice.reducer;
