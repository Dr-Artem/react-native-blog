import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
    const [locationCoords, setLocationCoords] = useState(null);

    useEffect(() => {
        (async () => {
            const coords = {
                latitude: route.params.locationCoords.latitude,
                longitude: route.params.locationCoords.longitude,
            };
            setLocationCoords(coords);
        })();
    }, [route]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    ...locationCoords,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
            >
                {locationCoords && <Marker coordinate={locationCoords} />}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});

export default MapScreen;
