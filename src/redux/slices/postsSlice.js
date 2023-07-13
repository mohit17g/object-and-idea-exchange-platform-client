import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/getUserProfile", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

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

export const getUserProfile2 = createAsyncThunk(
  "user/getUserProfile2",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/getUserProfile2", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getUserProfile3 = createAsyncThunk(
  "user/getUserProfile3",
  async (body) => {
    try {
      const response = await axiosClient.post("/user/getUserProfile3", body);
      return response.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body) => {
    try {
      const response = await axiosClient.post("/posts/like", body);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const likeAndUnlikePost1 = createAsyncThunk(
  "postproduct/likeAndUnlike",
  async (body) => {
    try {
      const response = await axiosClient.post("/postsproducts/like", body);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/updateMyPost",
  async (body) => {
    try {
      const response = await axiosClient.put("/posts/", body);
      return response.result.post;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;

        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        console.log("postslice", index);
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      })
      .addCase(getUserProfile1.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile2.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile3.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      // .addCase(getUserProfile2.fulfilled, (state, action) => {
      //   state.userProfile = action.payload;
      // })
      .addCase(likeAndUnlikePost1.fulfilled, (state, action) => {
        const postproduct = action.payload;

        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === postproduct._id
        );
        console.log("postslice", index);
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = postproduct;
        }
      });
    // .addCase(deletePost.fulfilled, (state, action) => {
    //   state.userProfile = action.payload;
    // });
  },
});

export default postsSlice.reducer;
