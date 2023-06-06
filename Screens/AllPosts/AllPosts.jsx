import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selector";
import { addLike } from "../../redux/posts/operation";
import { selectAllPosts } from "../../redux/posts/selector";

const AllPosts = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const posts = useSelector(selectAllPosts);

    const likePost = (id) => {
        const userId = user.uid;
        const postId = id;
        dispatch(addLike({ userId, postId }));
    };

    return (
        <View style={styles.postsContainer}>
            {posts && (
                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.postWrapper}>
                            <Image
                                style={styles.postPhoto}
                                source={{ uri: item.src }}
                            />

                            <Text style={styles.postName}>{item.name}</Text>
                            <View style={styles.postInfo}>
                                <View style={styles.postReactions}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "Comments",
                                                item
                                            )
                                        }
                                    >
                                        <View style={styles.postComments}>
                                            <Ionicons
                                                name="chatbubble-outline"
                                                size={24}
                                                color={
                                                    item?.comments.length === 0
                                                        ? "#BDBDBD"
                                                        : "#FF6C00"
                                                }
                                            />
                                            <Text
                                                style={{
                                                    color:
                                                        item?.comments
                                                            .length === 0
                                                            ? "#BDBDBD"
                                                            : "#212121",
                                                }}
                                            >
                                                {item?.comments.length}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => likePost(item.id)}
                                    >
                                        <View style={styles.postLikes}>
                                            <Ionicons
                                                name="thumbs-up-outline"
                                                size={24}
                                                color={
                                                    item.likes.length === 0
                                                        ? "#BDBDBD"
                                                        : "#FF6C00"
                                                }
                                            />
                                            <Text
                                                style={{
                                                    color:
                                                        item.likes.length === 0
                                                            ? "#BDBDBD"
                                                            : "#212121",
                                                }}
                                            >
                                                {item.likes.length}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("Map", item)
                                    }
                                    style={styles.postLocation}
                                >
                                    <Ionicons
                                        name="location-outline"
                                        size={24}
                                        color={"#BDBDBD"}
                                    />
                                    <Text style={styles.postLocationText}>
                                        {item.locationPlace}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default AllPosts;

const styles = StyleSheet.create({
    postsContainer: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingTop: 32,
        flex: 1,
    },
    userWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 32,
    },
    userInfoWrapper: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    userPhoto: {
        width: 60,
        height: 60,
    },
    userName: {
        fontSize: 13,
        lineHeight: 15,
        fontWeight: 700,
        color: "#212121",
    },
    userInfo: {
        fontSize: 11,
        lineHeight: 13,
        color: "rgba(33, 33, 33, 0.8)",
    },
    addPost: {
        backgroundColor: "#FF6C00",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 7,
        paddingHorizontal: 8,
    },
    postWrapper: {
        marginBottom: 32,
        gap: 8,
    },
    postPhoto: {
        width: "100%",
        height: Dimensions.get("window").width - 60,
        borderRadius: 8,
    },
    postName: {
        color: "#212121",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 19,
    },
    postInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    postReactions: {
        flexDirection: "row",
        gap: 24,
    },
    postComments: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    postLikes: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    postLocation: {
        flexDirection: "row",
        alignItems: "center",
    },
    postLocationText: {
        color: "#212121",
        textDecorationLine: "underline",
        fontSize: 16,
        lineHeight: 19,
    },
});
