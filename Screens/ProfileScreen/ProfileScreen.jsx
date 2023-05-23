import {
    FlatList,
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import bgImage from "../../images/BG.png";
import userPhoto from "../../images/user.png";

const posts = [
    {
        src: require("../../images/forest.png"),
        name: "Ліс",
        fullLocation: "Ivano-Frankivs'k Region, Ukraine",
        location: "Ukraine",
        likes: 2,
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
];

const ProfileScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={bgImage}
            resizeMode="cover"
            style={styles.backgroundImage}
        >
            <View style={styles.profileContainer}>
                <View style={styles.profilePhotoWrapper}>
                    <Image
                        style={styles.profileUserPhoto}
                        source={userPhoto}
                    />
                </View>
                <TouchableOpacity
                    style={styles.profilelogOutBtn}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={24}
                        color={"#BDBDBD"}
                    />
                </TouchableOpacity>
                <Text style={styles.profileHeader}>Natali Romanova</Text>

                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.postWrapper}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Comments", item)
                                }
                            >
                                <Image
                                    style={styles.postPhoto}
                                    source={item.src}
                                />
                            </TouchableOpacity>

                            <Text style={styles.postName}>{item.name}</Text>
                            <View style={styles.postInfo}>
                                <View style={styles.postReactions}>
                                    <View style={styles.postComments}>
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
                                    </View>
                                    <View style={styles.postLikes}>
                                        <Ionicons
                                            name="thumbs-up-outline"
                                            size={24}
                                            color={
                                                item.likes === 0
                                                    ? "#BDBDBD"
                                                    : "#FF6C00"
                                            }
                                        />
                                        <Text
                                            style={{
                                                color:
                                                    item.likes === 0
                                                        ? "#BDBDBD"
                                                        : "#212121",
                                            }}
                                        >
                                            {item.likes}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.postLocation}>
                                    <Ionicons
                                        name="location-outline"
                                        size={24}
                                        color={"#BDBDBD"}
                                    />
                                    <Text style={styles.postLocationText}>
                                        {item.location}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
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
        // fontFamily: "Roboto",
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
