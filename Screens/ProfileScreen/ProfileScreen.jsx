import {
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";

import { logoutDB } from "../../hooks/authHooks";
import bgImage from "../../images/BG.png";

import { selectUser } from "../../redux/auth/selector";
import { addLike } from "../../redux/posts/operation";
import { selectAllPosts } from "../../redux/posts/selector";

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const posts = useSelector(selectAllPosts);

    const userPosts = posts?.filter((post) => post.owner === user?.uid);

    const likePost = (id) => {
        const userId = user.uid;
        const postId = id;
        dispatch(addLike({ userId, postId }));
    };

    return (
        user && (
            <ImageBackground
                source={bgImage}
                resizeMode="cover"
                style={styles.backgroundImage}
            >
                <View style={styles.profileContainer}>
                    <View style={styles.profilePhotoWrapper}>
                        <Image
                            style={styles.profileUserPhoto}
                            source={{ uri: user.userPhoto }}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.profilelogOutBtn}
                        onPress={() => {
                            logoutDB();
                            navigation.navigate("Login");
                        }}
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={24}
                            color={"#BDBDBD"}
                        />
                    </TouchableOpacity>
                    <Text style={styles.profileHeader}>{user.userName}</Text>

                    <FlatList
                        data={userPosts}
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
                                                        item?.comments
                                                            .length === 0
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
                                                            item.likes
                                                                .length === 0
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
                </View>
            </ImageBackground>
        )
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        paddingTop: 200,
        justifyContent: "flex-end",
    },
    profileContainer: {
        position: "relative",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 16,
        paddingTop: 96,
    },
    profilePhotoWrapper: {
        position: "absolute",
        width: "100%",
        top: -60,
        marginHorizontal: 16,
        borderRadius: 16,
    },
    profilelogOutBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        paddingRight: 20,
        paddingTop: 20,
    },
    profileUserPhoto: {
        marginLeft: "auto",
        marginRight: "auto",
        width: 120,
        height: 120,
    },
    profileHeader: {
        fontWeight: 500,
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        letterSpacing: 0.01,
        color: "#212121",
        marginBottom: 32,
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

export default ProfileScreen;
