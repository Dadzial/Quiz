import { View,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {StyleSheet} from "react-native";

const TestScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text>TestScreen</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
});

export default TestScreen;