import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import debounce from "lodash.debounce";
import { useState } from "react";
import {
    Dimensions,
    ImageBackground,
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
import { useDispatch, useSelector } from "react-redux";

import CameraView from "../../components/CameraView/CameraView";
import { selectUser } from "../../redux/auth/selector";
import {
    createPost,
    deletePost,
    updatePost,
} from "../../redux/posts/operation";

const CreatePostScreen = ({ navigation, route }) => {
    const [cameraStatus, setCameraStatus] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(route.params?.src || null);
    const [name, setName] = useState(route.params?.name || "");
    const [locationPlace, setLocationPlace] = useState(
        route.params?.locationPlace || ""
    );
    const [locationCoords, setLocationCoords] = useState(
        route.params?.locationCoords || null
    );
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const findLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission to access location was denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
        setLocationCoords(coords);
        let loc = await Location.reverseGeocodeAsync(coords);
        setLocationPlace(`${loc[0].city}, ${loc[0].country}`);
    };

    const submitPost = async () => {
        const postData = {
            comments: [],
            likes: [],
            src: photoUrl,
            name,
            locationPlace,
            locationCoords,
            owner: user.uid,
        };
        const result = await dispatch(createPost(postData));

        if (!result.error) {
            navigation.navigate("PostsScreen");
        } else {
            console.log(result.payload);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPhotoUrl(result.assets[0].uri);
        }
    };

    const getCurrentPosition = async (event) => {
        const value = event.trim();
        try {
            let address = await Location.geocodeAsync(value);
            setLocationCoords({
                latitude: address[0].latitude,
                longitude: address[0].longitude,
            });
        } catch (error) {
            console.error("Error getting current position:", error);
        }
    };

    const deleteCurrent = async () => {
        const postId = route.params.id;
        const result = await dispatch(deletePost({ postId }));

        if (!result.error) {
            navigation.navigate("PostsScreen");
        } else {
            console.log(result.payload);
        }
    };

    const updateCurrent = async () => {
        const postId = route.params.id;
        const postData = {
            src: photoUrl,
            name,
            locationPlace,
            locationCoords,
        };
        const result = await dispatch(updatePost({ postId, postData }));

        if (!result.error) {
            navigation.navigate("PostsScreen");
        } else {
            console.log(result.payload);
        }
    };

    return cameraStatus ? (
        <CameraView
            setCameraStatus={setCameraStatus}
            setPhotoUrl={setPhotoUrl}
        />
    ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.createContainer}>
                <View style={styles.postWrapper}>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={
                            Platform.OS === "ios" ? "180" : "-80"
                        }
                        behavior={Platform.OS === "ios" ? "position" : "height"}
                    >
                        <View style={styles.postWrapperSeccond}>
                            {photoUrl ? (
                                <ImageBackground
                                    resizeMode="contain"
                                    source={{ uri: photoUrl }}
                                    style={[
                                        styles.postPhotoWrapper,
                                        {
                                            backgroundColor: "none",
                                        },
                                    ]}
                                >
                                    <TouchableOpacity
                                        style={styles.postWithPhotoIconWrapper}
                                        onPress={() => setCameraStatus(true)}
                                    >
                                        <Ionicons
                                            name="camera-outline"
                                            size={24}
                                            color={"#BDBDBD"}
                                        />
                                    </TouchableOpacity>
                                </ImageBackground>
                            ) : (
                                <View style={styles.postPhotoWrapper}>
                                    <TouchableOpacity
                                        style={
                                            styles.postWithoutPhotoIconWrapper
                                        }
                                        onPress={() => setCameraStatus(true)}
                                    >
                                        <Ionicons
                                            name="camera-outline"
                                            size={24}
                                            color={"#BDBDBD"}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <TouchableOpacity onPress={pickImage}>
                                <Text style={styles.postPhotoText}>
                                    Завантажити фото
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.postInputWrapper}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 8,
                                    width: "100%",
                                }}
                            >
                                <TextInput
                                    onChangeText={(event) => {
                                        setName(event);
                                    }}
                                    value={name}
                                    placeholder="Назва..."
                                    placeholderTextColor={"#BDBDBD"}
                                    style={styles.postInput}
                                />
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#FF6C00",
                                        borderRadius: 50,
                                        paddingHorizontal: 5,
                                        paddingVertical: 4,
                                    }}
                                    onPress={() => setName("")}
                                >
                                    <Ionicons
                                        name="close"
                                        size={28}
                                        color={"#FFFFFF"}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 8,
                                    width: "100%",
                                }}
                            >
                                <TextInput
                                    onChangeText={(event) => {
                                        setLocationPlace(event);
                                        getCurrentPosition(event);
                                    }}
                                    value={locationPlace}
                                    placeholder="Місцевість"
                                    placeholderTextColor={"#BDBDBD"}
                                    style={styles.postInput}
                                />
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#FF6C00",
                                        borderRadius: 50,
                                        paddingHorizontal: 5,
                                        paddingVertical: 4,
                                    }}
                                    onPress={findLocation}
                                >
                                    <Ionicons
                                        name="navigate-circle"
                                        size={28}
                                        color={"#FFFFFF"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={
                                photoUrl
                                    ? styles.postBtnActive
                                    : styles.postBtnDisabled
                            }
                            onPress={() =>
                                route.params ? updateCurrent() : submitPost()
                            }
                        >
                            <Text
                                style={
                                    photoUrl
                                        ? [
                                              styles.postBtnText,
                                              { color: "#FFFFFF" },
                                          ]
                                        : [
                                              styles.postBtnText,
                                              { color: "#BDBDBD" },
                                          ]
                                }
                            >
                                {route.params ? "Оновити" : "Опублікувати"}
                            </Text>
                        </TouchableOpacity>
                        {route.params && (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#FF6C00",
                                    borderRadius: 50,
                                    alignSelf: "center",
                                    paddingHorizontal: 30,
                                    paddingVertical: 5,
                                    marginTop: 40,
                                }}
                                onPress={deleteCurrent}
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={28}
                                    color={"#FFFFFF"}
                                />
                            </TouchableOpacity>
                        )}
                    </KeyboardAvoidingView>
                </View>
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
    postPhotoWrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8E8E8",
        borderRadius: 8,
        marginBottom: 8,
        height: Dimensions.get("window").width - 60,
    },
    postWithPhotoIconWrapper: {
        padding: 18,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        opacity: 0.4,
    },
    postWithoutPhotoIconWrapper: {
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
    postWrapperSeccond: {
        marginBottom: 32,
    },
    postInputWrapper: {
        gap: 16,
        marginBottom: 32,
    },
    postInput: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        lineHeight: 19,
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
    },
    postBtnActive: {
        borderRadius: 100,
        backgroundColor: "#FF6C00",
        paddingVertical: 16,
    },
    postBtnDisabled: {
        borderRadius: 100,
        backgroundColor: "#F6F6F6",
        paddingVertical: 16,
    },
    postBtnText: {
        textAlign: "center",

        fontSize: 16,
        lineHeight: 19,
    },
});

export default CreatePostScreen;
