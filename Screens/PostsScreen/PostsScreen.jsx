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
import { useSelector } from "react-redux";

import { selectUser } from "../../redux/auth/selector";
import { selectAllPosts } from "../../redux/posts/selector";

const Posts = ({ navigation }) => {
    const user = useSelector(selectUser);
    const posts = useSelector(selectAllPosts);
    const userPosts = posts?.filter((post) => post.owner === user?.uid);

    return (
        <View style={styles.postsContainer}>
            {user && (
                <View>
                    <View style={styles.userWrapper}>
                        <View style={styles.userInfoWrapper}>
                            <Image
                                style={styles.userPhoto}
                                source={{ uri: user.userPhoto }}
                            />
                            <View>
                                <Text style={styles.userName}>
                                    {user.userName}
                                </Text>
                                <Text style={styles.userInfo}>
                                    {user.email}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.addPost}
                            onPress={() => navigation.navigate("CreatePost")}
                        >
                            <Ionicons
                                name="add-outline"
                                size={24}
                                color={"#FFFFFF"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {userPosts && (
                <FlatList
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View style={styles.postWrapper}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("CreatePost", item)
                                }
                            >
                                <Image
                                    style={styles.postPhoto}
                                    source={{ uri: item.src }}
                                />
                            </TouchableOpacity>

                            <Text style={styles.postName}>{item.name}</Text>
                            <View style={styles.postInfo}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("Comments", item)
                                    }
                                    style={styles.postComments}
                                >
                                    <Ionicons
                                        name="chatbubble-outline"
                                        size={24}
                                        color={
                                            item.comments.length === 0
                                                ? "#BDBDBD"
                                                : "#FF6C00"
                                        }
                                    />
                                    <Text
                                        style={{
                                            color:
                                                item.comments.length === 0
                                                    ? "#BDBDBD"
                                                    : "#212121",
                                        }}
                                    >
                                        {item.comments.length}
                                    </Text>
                                </TouchableOpacity>
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
    postComments: {
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

export default Posts;
