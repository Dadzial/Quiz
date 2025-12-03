import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import TestCard from "../components/TestCard";
import { useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../Navigation/NavigationDrawler";
import {DrawerNavigationProp} from "@react-navigation/drawer";

const HomeScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const testList = [
        { title: "Test 1", description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
        { title: "Test 2", description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
        { title: "Test 3", description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
        { title: "Test 4", description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book" },
    ];

    return (
        <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
            <ScrollView
                contentContainerStyle={{ ...styles.scrollContent, flexGrow: 1 }}
                style={{ flex: 1 }}
            >
                <Text style={styles.ScreenNameText}>Home</Text>

                {testList.map((test, index) => (
                    <TestCard
                        key={index}
                        title={test.title}
                        description={test.description}
                    />
                ))}

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.footerButton} onPress={() => navigation.navigate("Results")}
                    >
                        <Text style={styles.footerButtonText}>See Results</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    ScreenNameText: {
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        color: "#295ac1",
        marginVertical: 10,
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerButton: {
        backgroundColor: '#295ac1',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    footerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
