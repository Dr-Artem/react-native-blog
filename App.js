import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import CommentsScreen from "./Screens/CommentsScreen/CommentsScreen";
import CreatePostScreen from "./Screens/CreatePostScreen/CreatePostScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import MapScreen from "./Screens/MapScreen/MapScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { persistor, store } from "./redux/store";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "./redux/auth/operation";
import { selectIsLoggedIn } from "./redux/auth/selector";

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate
                loading={null}
                persistor={persistor}
            >
                <View style={styles.container}>
                    <MainNavigator />
                </View>
            </PersistGate>
        </Provider>
    );
}

const MainNavigator = () => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
        dispatch(refresh());
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                id="MainNavigator"
                initialRouteName={loggedIn ? "Home" : "Login"}
            >
                <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreatePost"
                    component={CreatePostScreen}
                    options={{
                        title: "Створити публікацію",
                        headerBackTitleVisible: false,
                        headerLeftContainerStyle: {
                            paddingLeft: 16,
                        },
                    }}
                />
                <Stack.Screen
                    name="Comments"
                    component={CommentsScreen}
                    options={{
                        title: "Коментарі",
                        headerBackTitleVisible: false,
                        headerLeftContainerStyle: {
                            paddingLeft: 16,
                        },
                    }}
                />
                <Stack.Screen
                    name="Map"
                    component={MapScreen}
                    options={{
                        title: "Карта",
                        headerBackTitleVisible: false,
                        headerLeftContainerStyle: {
                            paddingLeft: 16,
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
