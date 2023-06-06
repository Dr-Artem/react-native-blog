import { createAsyncThunk } from "@reduxjs/toolkit";
import * as MediaLibrary from "expo-media-library";
import {
    addDoc,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../config";

export const fetchPosts = createAsyncThunk(
    "posts/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const { docs } = await getDocs(collection(db, "posts"));
            const fetchedPosts = docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            return fetchedPosts;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createPost = createAsyncThunk(
    "posts/create",
    async (postData, { rejectWithValue }) => {
        try {
            await addDoc(collection(db, "posts"), postData);
            await MediaLibrary.createAssetAsync(postData.src);
            return postData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updatePost = createAsyncThunk(
    "posts/update",
    async ({ postId, postData }, { rejectWithValue }) => {
        try {
            const postRef = doc(db, "posts", postId);
            await updateDoc(postRef, {
                src: postData.src,
                name: postData.name,
                locationPlace: postData.locationPlace,
                locationCoords: postData.locationCoords,
            });
            return { postId, postData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/delete",
    async ({ postId }, { rejectWithValue }) => {
        try {
            const postRef = doc(db, "posts", postId);
            await deleteDoc(postRef);
            return postId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addLike = createAsyncThunk(
    "/posts/like",
    async ({ userId, postId }, { rejectWithValue }) => {
        try {
            const postDocRef = doc(db, "posts", postId);
            const postSnapshot = await getDoc(postDocRef);
            const docLikes = postSnapshot.data().likes;

            if (docLikes.includes(userId)) {
                const updatedLikes = docLikes.filter((like) => like !== userId);
                await updateDoc(postDocRef, { likes: updatedLikes });
                return { updatedLikes, postId };
            } else {
                const updatedLikes = [...docLikes, userId];
                await updateDoc(postDocRef, { likes: updatedLikes });

                return { updatedLikes, postId };
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addComment = createAsyncThunk(
    "/posts/addComment",
    async ({ commentData, id }, { rejectWithValue }) => {
        try {
            const postDocRef = doc(db, "posts", `${id}`);

            await updateDoc(postDocRef, {
                comments: arrayUnion(commentData),
            });
            return { commentData, id };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
