import dayjs from "dayjs";
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

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selector";
import { addComment } from "../../redux/posts/operation";
import { selectComments } from "../../redux/posts/selector";

const CommentsScreen = ({ route }) => {
    const { src, id } = route.params;
    const [comment, setComment] = useState(null);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const comments = useSelector((state) => selectComments(state, id));

    const postComment = () => {
        if (comment.trim() !== "") {
            const commentData = {
                userId: user.uid,
                message: comment,
                userName: user.userName,
                userPhoto: user.userPhoto,
                timeStamp: Date.now(),
            };
            dispatch(addComment({ commentData, id }));
            setComment("");
            Keyboard.dismiss();
        }
    };

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
                        source={{ uri: src }}
                    />
                </TouchableWithoutFeedback>

                <FlatList
                    data={comments}
                    renderItem={({ item }) => {
                        const date = dayjs(item.timeStamp).format(
                            "YYYY-MM-DD | HH:mm:ss"
                        );
                        return (
                            item && (
                                <View
                                    style={{
                                        ...styles.commentItem,
                                        flexDirection:
                                            item.userId === user.uid
                                                ? "row-reverse"
                                                : "row",
                                    }}
                                >
                                    <Image
                                        style={styles.commentUserPhoto}
                                        source={{ uri: item.userPhoto }}
                                    />
                                    <View
                                        style={{
                                            ...styles.commentUserMessage,
                                            borderTopLeftRadius:
                                                item.userId === user.uid
                                                    ? 6
                                                    : 0,
                                            borderTopRightRadius:
                                                item.userId === user.uid
                                                    ? 0
                                                    : 6,
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
                                            {date}
                                        </Text>
                                    </View>
                                </View>
                            )
                        );
                    }}
                />

                <View style={styles.commentInputWrapper}>
                    <TextInput
                        placeholder="Коментувати..."
                        placeholderTextColor={"#BDBDBD"}
                        style={styles.commentInput}
                        onChangeText={setComment}
                        value={comment}
                    />
                    <TouchableOpacity
                        onPress={postComment}
                        style={styles.commentInputSubmit}
                    >
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
