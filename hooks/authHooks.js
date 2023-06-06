import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../config";

const registerDB = async ({ email, password }) => {
    try {
        const credentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return credentials.user;
    } catch (error) {
        throw error;
    }
};

const loginDB = async ({ email, password }) => {
    try {
        const credentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return credentials.user;
    } catch (error) {
        throw error;
    }
};
const logoutDB = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
};

const updateUserProfile = async (update) => {
    const user = auth.currentUser;

    if (user) {
        try {
            await updateProfile(user, update);
        } catch (error) {
            throw error;
        }
    }
};

const authStateChanged = async (onChange = () => {}) => {
    onAuthStateChanged((user) => {
        onChange(user);
    });
};

export { registerDB, loginDB, updateUserProfile, logoutDB, authStateChanged };
