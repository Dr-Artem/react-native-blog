import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operation";

import {
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

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async () => {
        const result = await dispatch(login({ email, password }));

        if (!result.error) {
            setEmail("");
            setPassword("");
            navigation.navigate("Home");
        } else {
            console.log(result.error.message);
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
                            Platform.OS === "ios" ? "-190" : "-70"
                        }
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View style={styles.formContainer}>
                            <Text style={styles.formHeader}>Увійти</Text>
                            <View style={styles.formInputList}>
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
                                    autoComplete="password"
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
                                onPress={onLogin}
                            >
                                <Text style={styles.formBtnText}>Увійти</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Registration")
                                }
                            >
                                <Text
                                    style={styles.loginRedirect}
                                    dataDetectorType="link"
                                >
                                    Відсутній аккаунт? Зареєструватись
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
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 96,
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

export default LoginScreen;
