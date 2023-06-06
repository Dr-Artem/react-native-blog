import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    loginDB,
    logoutDB,
    registerDB,
    updateUserProfile,
} from "../../hooks/authHooks";

export const register = createAsyncThunk(
    "auth/register",
    async ({ email, password, userName, userPhoto }, { rejectWithValue }) => {
        try {
            const data = await registerDB({ email, password });
            await updateUserProfile({
                displayName: userName,
                photoURL: userPhoto,
            });
            const authData = {
                userName: data.displayName,
                email: data.email,
                userPhoto: data.photoURL,
                uid: data.uid,
                accessToken: data.stsTokenManager.accessToken,
                refreshToken: data.stsTokenManager.refreshToken,
            };
            return authData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await loginDB({ email, password });
            const authData = {
                userName: data.displayName,
                email: data.email,
                userPhoto: data.photoURL,
                uid: data.uid,
                accessToken: data.stsTokenManager.accessToken,
                refreshToken: data.stsTokenManager.refreshToken,
            };
            AsyncStorage.setItem("user", JSON.stringify(authData));
            return authData;
        } catch (error) {
            return rejectWithValue(error.massage);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            AsyncStorage.removeItem("user");
            await logoutDB();
        } catch (error) {
            return rejectWithValue(error.massage);
        }
    }
);

export const refresh = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
        const data = await AsyncStorage.getItem("user");
        if (data) {
            return JSON.parse(data);
        }
        return rejectWithValue(error.massage);
    }
);
