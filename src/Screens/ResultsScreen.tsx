import {View,Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {StyleSheet} from "react-native";

const ResultsScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text>ResultsScreen</Text>
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

export default ResultsScreen;
