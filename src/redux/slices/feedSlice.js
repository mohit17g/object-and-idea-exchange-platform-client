import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeAndUnlikePost } from "./postsSlice";

export const getFeedData = createAsyncThunk("user/getPostsOfAll", async () => {
  try {
    const response = await axiosClient.get("/user/getPostsOfAll");
    console.log("userProfile", response);
    return response.result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getAllUsers = createAsyncThunk("user/getAllUser", async () => {
  try {
    const response = await axiosClient.get("/user/getAllUser");
    console.log("userProfile", response);
    return response.result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getUserProfile1 = createAsyncThunk(
  "user/getUserProfile1",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/getUserProfile1", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getFeedData1 = createAsyncThunk(
  "user/getPostsproductsOfAll",
  async () => {
    try {
      const response = await axiosClient.get("/user/getPostsproductsOfAll");
      console.log("userProfile", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getFeedData2 = createAsyncThunk(
  "user/getPostseventsOfAll",
  async () => {
    try {
      const response = await axiosClient.get("/user/getPostseventsOfAll");
      console.log("userProfile", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getFeedData3 = createAsyncThunk(
  "user/getPostsrecruitmentsOfAll",
  async () => {
    try {
      const response = await axiosClient.get("/user/getPostsrecruitmentsOfAll");
      console.log("userProfile", response);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const followAndUnfollowUser = createAsyncThunk(
  "user/followAndUnfollow",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/follow", body);
      return response.result.user;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(getUserProfile1.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getFeedData1.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(getFeedData2.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(getFeedData3.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;

        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        console.log("feed like", post, index);
        if (index !== undefined && index !== -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings.findIndex(
          (item) => item._id === user._id
        );
        if (index !== -1) {
          state?.feedData.followings.splice(index, 1);
        } else {
          state?.feedData.followings.push(user);
        }
      });
  },
});

export default feedSlice.reducer;
