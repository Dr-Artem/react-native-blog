import { useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import userPhoto from "../../images/user.png";

const Posts = ({ navigation }) => {
    const [posts, setPosts] = useState([
        {
            src: require("../../images/forest.png"),
            name: "Ліс",
            fullLocation: "Ivano-Frankivs'k Region, Ukraine",
            location: "Ukraine",
            likes: 0,
            comments: [],
        },
        {
            src: require("../../images/sunset.png"),
            name: "Захід на Чорному Морі",
            fullLocation: "Crimea, Ukraine",
            location: "Ukraine",
            likes: 0,
            comments: [
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message:
                        "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
                    date: "09 июня, 2020",
                    time: "08:40",
                    key: "1",
                },
                {
                    userName: "user",
                    userPicture: userPhoto,
                    message:
                        "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
                    date: "09 июня, 2020",
                    time: "09:14",
                    key: "2",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "3",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "4",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "5",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "6",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "7",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "8",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "9",
                },
                {
                    userName: "user2",
                    userPicture: require("../../images/user2.png"),
                    message: "Thank you! That was very helpful!",
                    date: "09 июня, 2020",
                    time: "09:20",
                    key: "10",
                },
            ],
        },
        {
            src: require("../../images/house.png"),
            name: "Старий будиночок у Венеції",
            fullLocation: "Venice, Italy",
            location: "Italy",
            likes: 0,
            comments: [],
        },
    ]);

    return (
        <View style={styles.postsContainer}>
            <View>
                <View style={styles.userWrapper}>
                    <View style={styles.userInfoWrapper}>
                        <Image
                            style={styles.userPhoto}
                            source={userPhoto}
                        />
                        <View>
                            <Text style={styles.userName}>Natali Romanova</Text>
                            <Text style={styles.userInfo}>
                                email@example.com
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

            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <View style={styles.postWrapper}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("CreatePost", item)
                            }
                        >
                            <Image
                                style={styles.postPhoto}
                                source={item.src}
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
                                onPress={() => navigation.navigate("Map", item)}
                                style={styles.postLocation}
                            >
                                <Ionicons
                                    name="location-outline"
                                    size={24}
                                    color={"#BDBDBD"}
                                />
                                <Text style={styles.postLocationText}>
                                    {item.fullLocation}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
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
        height: 240,
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
