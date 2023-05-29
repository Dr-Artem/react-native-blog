import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CameraView = ({ setCameraStatus, setPhotoUrl }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [screenWidth, setScreenWidth] = useState(
        Dimensions.get("window").width
    );

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                style={{ width: screenWidth, height: screenWidth }}
                type={type}
                ref={setCameraRef}
            >
                <View style={styles.photoView}>
                    <View
                        style={{
                            position: "absolute",
                            width: "100%",
                            bottom: 30,
                            paddingHorizontal: 30,
                            opacity: 0.8,
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            style={styles.backContainer}
                            onPress={() => setCameraStatus(false)}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                }}
                            >
                                Back
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.flipContainer}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "white",
                                }}
                            >
                                Flip
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            if (cameraRef) {
                                const { uri } =
                                    await cameraRef.takePictureAsync();
                                setPhotoUrl(uri);
                                setCameraStatus(false);
                            }
                        }}
                    >
                        <View style={styles.takePhotoOut}>
                            <View style={styles.takePhotoInner}></View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000000",
    },
    photoView: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end",
    },

    button: { alignSelf: "center", paddingBottom: 20, opacity: 0.8 },

    takePhotoOut: {
        borderWidth: 2,
        borderColor: "white",
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },

    takePhotoInner: {
        borderWidth: 2,
        borderColor: "white",
        height: 40,
        width: 40,
        backgroundColor: "white",
        borderRadius: 50,
    },
});

export default CameraView;
