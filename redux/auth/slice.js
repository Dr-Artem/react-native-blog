import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./operation";

const initialState = {
    user: null,
    loading: false,
    error: null,
    loggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.loggedIn = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.loggedIn = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(refresh.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.loggedIn = true;
            })
            .addCase(refresh.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const authReducer = authSlice.reducer;
