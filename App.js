import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import CommentsScreen from "./Screens/CommentsScreen/CommentsScreen";
import CreatePostScreen from "./Screens/CreatePostScreen/CreatePostScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <View style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator
                    id="MainNavigator"
                    initialRouteName="Login"
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
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
