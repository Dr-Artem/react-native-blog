import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PostsScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <Tab.Navigator
            id="TabNavigator"
            initialRouteName="PostsScreen"
            screenOptions={{
                tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
                tabBarActiveTintColor: "#FFFFFF",
                tabBarActiveBackgroundColor: "#FF6C00",
                tabBarStyle: {
                    alignItems: "center",
                    height: 90,
                    paddingTop: 10,
                },
                tabBarItemStyle: {
                    marginHorizontal: 10,
                    borderRadius: 20,
                    maxWidth: 70,
                    maxHeight: 40,
                },
            }}
        >
            <Tab.Screen
                name="Feed"
                component={PostsScreen}
                options={{
                    tabBarShowLabel: false,
                    title: "Всі публікації",
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.logOutBtn}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={24}
                                color={"#BDBDBD"}
                            />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons
                            name="grid-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="PostsScreen"
                component={PostsScreen}
                options={{
                    tabBarShowLabel: false,
                    title: "Публікації",
                    headerRight: () => (
                        <TouchableOpacity
                            style={styles.logOutBtn}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={24}
                                color={"#BDBDBD"}
                            />
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons
                            name="home-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={ProfileScreen}
                options={{
                    title: "Юзер",
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons
                            name="person-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    logOutBtn: {
        paddingRight: 16,
    },
});

export default HomeScreen;
