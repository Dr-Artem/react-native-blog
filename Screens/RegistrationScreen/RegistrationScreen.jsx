import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operation";

import * as ImagePicker from "expo-image-picker";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config";

import {
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import bgImage from "../../images/BG.png";

const RegistrationScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userPhoto, setUserPhoto] = useState(
        "https://res.cloudinary.com/dmaywrdz0/image/upload/v1685389228/react-native-app/userlogo_uphxim.png"
    );

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setUserPhoto(result.assets[0].uri);
        }
    };

    const onRegister = async () => {
        const result = await dispatch(
            register({ email, password, userName, userPhoto })
        );
        if (!result.error) {
            const data = result.payload;
            await addDoc(collection(db, "users"), {
                userName: data.userName,
                userPhoto: data.userPhoto,
                userEmail: data.email,
            });
            setUserName("");
            setEmail("");
            setPassword("");
            navigation.navigate("Home");
        } else {
            console.log(result.payload);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                source={bgImage}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={
                            Platform.OS === "ios" ? "-180" : "-80"
                        }
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View style={styles.formContainer}>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={styles.formPhotoWrapper}
                            >
                                <Image
                                    style={styles.formUserPhoto}
                                    source={{
                                        uri: userPhoto,
                                    }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.formHeader}>Реєстрація</Text>
                            <View style={styles.formInputList}>
                                <TextInput
                                    keyboardAppearance={
                                        Platform.OS === "ios" ? "dark" : null
                                    }
                                    style={styles.formInput}
                                    placeholder="Логін"
                                    placeholderTextColor={"#BDBDBD"}
                                    onChangeText={setUserName}
                                    value={userName}
                                />
                                <TextInput
                                    keyboardAppearance={
                                        Platform.OS === "ios" ? "dark" : null
                                    }
                                    inputMode="email"
                                    autoComplete="email"
                                    textContentType="emailAddress"
                                    style={styles.formInput}
                                    placeholder="Адрес електронної почти"
                                    placeholderTextColor={"#BDBDBD"}
                                    onChangeText={setEmail}
                                    value={email}
                                />
                                <TextInput
                                    keyboardAppearance={
                                        Platform.OS === "ios" ? "dark" : null
                                    }
                                    textContentType="password"
                                    style={styles.formInput}
                                    placeholder="Пароль"
                                    placeholderTextColor={"#BDBDBD"}
                                    onChangeText={setPassword}
                                    value={password}
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.formBtn}
                                onPress={onRegister}
                            >
                                <Text style={styles.formBtnText}>
                                    Зареєструватись
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text
                                    style={styles.loginRedirect}
                                    dataDetectorType="link"
                                >
                                    Вже є аккаунт? Увійти
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: "flex-end",
    },
    formContainer: {
        position: "relative",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        paddingTop: 96,
        paddingBottom: 80,
    },
    formPhotoWrapper: {
        position: "absolute",
        width: "100%",
        top: -60,
        marginHorizontal: 16,
    },
    formUserPhoto: {
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        marginLeft: "auto",
        marginRight: "auto",
        width: 120,
        height: 120,
    },
    formHeader: {
        // fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        letterSpacing: 0.01,
        color: "#212121",
        marginBottom: 32,
    },
    formInputList: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginBottom: 32,
    },
    formInput: {
        padding: 16,
        fontSize: 16,
        lineHeight: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderStyle: "solid",
        backgroundColor: "#F6F6F6",
    },
    formBtn: {
        borderRadius: 100,
        backgroundColor: "#FF6C00",
        paddingHorizontal: 32,
        paddingVertical: 16,
        marginBottom: 16,
    },
    formBtnText: {
        color: "#FFFFFF",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
    },
    loginRedirect: {
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#1B4371",
    },
});

export default RegistrationScreen;
