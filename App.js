import { StyleSheet, View } from "react-native";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import bgImage from "./images/BG.png";

export default function App() {
    return (
        <View style={styles.container}>
            {/* <LoginScreen bgImage={bgImage} /> */}
            <RegistrationScreen bgImage={bgImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
