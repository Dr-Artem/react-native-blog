import {
    FlatList,
    Image,
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

const CommentsScreen = ({ route }) => {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "null"}
            keyboardVerticalOffset={Platform.OS === "ios" ? "70" : "-80"}
        >
            <View style={styles.commentsContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Image
                        style={styles.commentsPhoto}
                        source={route.params.src}
                    />
                </TouchableWithoutFeedback>

                <FlatList
                    data={route.params.comments}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                ...styles.commentItem,
                                flexDirection:
                                    item.userName === "user"
                                        ? "row-reverse"
                                        : "row",
                            }}
                        >
                            <Image
                                style={styles.commentUserPhoto}
                                source={item.userPicture}
                            />
                            <View
                                style={{
                                    ...styles.commentUserMessage,
                                    borderTopLeftRadius:
                                        item.userName === "user" ? 6 : 0,
                                    borderTopRightRadius:
                                        item.userName === "user" ? 0 : 6,
                                }}
                            >
                                <Text style={styles.commentText}>
                                    {item.message}
                                </Text>
                                <Text
                                    style={{
                                        ...styles.commentDateTime,
                                        textAlign:
                                            item.userName === "user"
                                                ? "left"
                                                : "right",
                                    }}
                                >
                                    {item.date} | {item.time}
                                </Text>
                            </View>
                        </View>
                    )}
                />

                <View style={styles.commentInputWrapper}>
                    <TextInput
                        placeholder="Коментувати..."
                        placeholderTextColor={"#BDBDBD"}
                        style={styles.commentInput}
                    />
                    <TouchableOpacity style={styles.commentInputSubmit}>
                        <Ionicons
                            name="arrow-up-outline"
                            size={24}
                            color={"#FFFFFF"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    commentsContainer: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 32,
        paddingHorizontal: 16,
        flex: 1,
        justifyContent: "flex-end",
    },
    commentsPhoto: {
        width: "100%",
        height: 240,
        borderRadius: 8,
        marginBottom: 32,
    },
    commentItem: {
        gap: 16,
        marginBottom: 24,
    },
    commentUserPhoto: {
        width: 28,
        height: 28,
        borderRadius: 50,
    },
    commentUserMessage: {
        padding: 16,
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        maxWidth: 320,
        borderRadius: 6,
    },
    commentText: {
        color: "#212121",
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 8,
    },
    commentDateTime: {
        color: "#BDBDBD",
        fontSize: 10,
        lineHeight: 12,
    },
    commentInputWrapper: {
        position: "relative",
    },
    commentInput: {
        padding: 16,
        paddingRight: 60,
        fontSize: 16,
        lineHeight: 19,
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        borderColor: "#E8E8E8",
        borderWidth: 1,
    },
    commentInputSubmit: {
        position: "absolute",
        top: 7,
        right: 8,
        paddingVertical: 7,
        paddingHorizontal: 8,
        backgroundColor: "#FF6C00",
        borderRadius: "50%",
    },
});

export default CommentsScreen;
