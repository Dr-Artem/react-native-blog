import { createSlice } from "@reduxjs/toolkit";
import {
    addComment,
    addLike,
    createPost,
    deletePost,
    fetchPosts,
    updatePost,
} from "./operation";

const initialState = {
    allPosts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.allPosts = action.payload;
                state.loggedIn = true;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.allPosts = [...state.allPosts, action.payload];
                state.loggedIn = true;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const { postId, postData } = action.payload;
                const postIndex = state.allPosts.findIndex(
                    (post) => post.id === postId
                );
                if (postIndex !== -1) {
                    state.allPosts[postIndex] = {
                        ...state.allPosts[postIndex],
                        ...postData,
                    };
                }
                state.loading = false;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.allPosts = state.allPosts.filter(
                    (item) => item.id !== action.payload
                );
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addLike.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addLike.fulfilled, (state, action) => {
                const { updatedLikes, postId } = action.payload;

                const postIndex = state.allPosts.findIndex(
                    (post) => post.id === postId
                );
                if (postIndex !== -1) {
                    state.allPosts[postIndex].likes = updatedLikes;
                }
                state.loading = false;
            })
            .addCase(addLike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { commentData, id } = action.payload;

                const postIndex = state.allPosts.findIndex(
                    (post) => post.id === id
                );
                state.allPosts[postIndex].comments = [
                    ...state.allPosts[postIndex].comments,
                    commentData,
                ];
                state.loading = false;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const postReducer = postSlice.reducer;
