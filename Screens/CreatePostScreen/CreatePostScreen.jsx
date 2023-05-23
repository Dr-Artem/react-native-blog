import {
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreatePostScreen = () => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.createContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={styles.postWrapper}>
                        <View>
                            <View style={styles.postPhotoWrapper}>
                                <View style={styles.postPhotoIconWrapper}>
                                    <Ionicons
                                        name="camera-outline"
                                        size={24}
                                        color={"#BDBDBD"}
                                    />
                                </View>
                            </View>
                            <Text style={styles.postPhotoText}>
                                Загрузите фото
                            </Text>
                        </View>

                        <View style={styles.postInputWrapper}>
                            <TextInput
                                placeholder="Назва..."
                                placeholderTextColor={"#BDBDBD"}
                                style={styles.postInput}
                            />
                            <TextInput
                                placeholder="Місцевість"
                                placeholderTextColor={"#BDBDBD"}
                                style={styles.postInput}
                            />
                        </View>

                        <TouchableOpacity style={styles.postBtnWrapper}>
                            <Text style={styles.postBtnText}>Опублікувати</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    createContainer: {
        backgroundColor: "#FFFFFF",
        padding: 32,
        flex: 1,
    },
    postWrapper: {
        gap: 32,
    },
    postPhotoWrapper: {
        justifyContent: "center",
        alignItems: "center",
        height: 240,
        backgroundColor: "#E8E8E8",
        borderRadius: 8,
        borderColor: "#E8E8E8",
        borderStyle: "solid",
        borderWidth: 1,
        marginBottom: 8,
    },
    postPhotoIconWrapper: {
        padding: 18,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
    },
    postPhotoText: {
        color: "#BDBDBD",
        fontSize: 16,
        lineHeight: 19,
        fontWeight: 400,
    },
    postInputWrapper: {
        gap: 16,
    },
    postInput: {
        paddingVertical: 16,
        fontSize: 16,
        lineHeight: 19,
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
    },
    postBtnWrapper: {
        borderRadius: 100,
        backgroundColor: "#F6F6F6",
        paddingVertical: 16,
    },
    postBtnText: {
        textAlign: "center",
        color: "#BDBDBD",
        fontSize: 16,
        lineHeight: 19,
    },
});

export default CreatePostScreen;
