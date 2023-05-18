import { useState } from "react";
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
import userPhoto from "../../images/user.png";

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
        borderRadius: 16,
    },
    formUserPhoto: {
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

const RegistrationScreen = ({ bgImage }) => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onRegister = () => {
        console.log(userName, email, password);
        setUserName("");
        setEmail("");
        setPassword("");
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
                            <View style={styles.formPhotoWrapper}>
                                <Image
                                    style={styles.formUserPhoto}
                                    source={userPhoto}
                                />
                            </View>
                            <Text style={styles.formHeader}>Реєстрація</Text>
                            <View style={styles.formInputList}>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder="Логін"
                                    placeholderTextColor={"#BDBDBD"}
                                    onChangeText={setUserName}
                                    value={userName}
                                />
                                <TextInput
                                    style={styles.formInput}
                                    placeholder="Адрес електронної почти"
                                    placeholderTextColor={"#BDBDBD"}
                                    onChangeText={setEmail}
                                    value={email}
                                />
                                <TextInput
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
                            <Text
                                style={styles.loginRedirect}
                                dataDetectorType="link"
                            >
                                Вже є аккаунт? Увійти
                            </Text>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default RegistrationScreen;
