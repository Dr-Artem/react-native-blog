import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
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
import CameraView from "../../components/CameraView/CameraView";

const CreatePostScreen = ({ navigation }) => {
    const [cameraStatus, setCameraStatus] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(null);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const screenWidth = Dimensions.get("window").width;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }

            let location = await Location.getCurrentPositionAsync({});
            const coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            let loc = await Location.reverseGeocodeAsync(coords);
            setLocation(`${loc[0].city}, ${loc[0].region}, ${loc[0].country}`);
        })();
    }, []);

    const submitPost = async () => {
        // await MediaLibrary.createAssetAsync(photoUrl);
        navigation.navigate("PostsScreen");
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
        let address = await Location.geocodeAsync(event.target.value);
        setLocation(address);
    };

    return cameraStatus ? (
        <CameraView
            setCameraStatus={setCameraStatus}
            setPhotoUrl={setPhotoUrl}
        />
    ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.createContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <View style={styles.postWrapper}>
                        <View>
                            {photoUrl ? (
                                <ImageBackground
                                    resizeMode="contain"
                                    source={{ uri: photoUrl }}
                                    style={[
                                        styles.postPhotoWrapper,
                                        {
                                            height: screenWidth,
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
                                <View
                                    style={[
                                        styles.postPhotoWrapper,
                                        { height: screenWidth },
                                    ]}
                                >
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
                            <TextInput
                                onChangeText={(e) => setName(e.target.value)}
                                value={name}
                                placeholder="Назва..."
                                placeholderTextColor={"#BDBDBD"}
                                style={styles.postInput}
                            />
                            <TextInput
                                onChangeText={(e) => {
                                    getCurrentPosition(e);
                                }}
                                value={location}
                                placeholder="Місцевість"
                                placeholderTextColor={"#BDBDBD"}
                                style={styles.postInput}
                            />
                        </View>
                        {photoUrl ? (
                            <TouchableOpacity
                                style={styles.postBtnActive}
                                onPress={() => submitPost()}
                            >
                                <Text
                                    style={[
                                        styles.postBtnText,
                                        { color: "#FFFFFF" },
                                    ]}
                                >
                                    Опублікувати
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.postBtnDisabled}>
                                <Text
                                    style={[
                                        styles.postBtnText,
                                        { color: "#BDBDBD" },
                                    ]}
                                >
                                    Опублікувати
                                </Text>
                            </TouchableOpacity>
                        )}
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
        backgroundColor: "#E8E8E8",
        borderRadius: 8,
        marginBottom: 8,
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
