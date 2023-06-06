// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAv3yRLRIAnnhLP98NHT7NwTmKEEkcHMYw",
    authDomain: "reactnative-e5791.firebaseapp.com",
    databaseURL:
        "https://reactnative-e5791-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "reactnative-e5791",
    storageBucket: "reactnative-e5791.appspot.com",
    messagingSenderId: "864382903287",
    appId: "1:864382903287:web:9b6eabe9c75b6e3efc04f2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
