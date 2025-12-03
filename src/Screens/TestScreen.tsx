import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import {DrawerParamList} from "../Navigation/NavigationDrawler";

const TestScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    const answers = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];
    const timerPercentage = 0.6;

    return (
        <SafeAreaView edges={['bottom']} style={styles.mainContainer}>

            <View style={styles.headerTop}>
                <Text style={styles.ScreenNameText}>Test</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerQuestion}>Question 3 of 5</Text>
                    <Text style={styles.headerTime}>Time: 23 sec</Text>
                </View>

                <View style={styles.timerContainer}>
                    <View style={[styles.timerBar, { width: `${timerPercentage * 100}%` }]} />
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>What is the capital of France?</Text>
                </View>

                <View style={styles.questionDescriptionContainer}>
                    <Text style={styles.questionDescriptionText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </View>


                <View style={styles.answersContainer}>
                    {answers.map((answer, index) => (
                        <TouchableOpacity key={index} style={styles.answerButton}>
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.quitButton} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.quitButtonText}>Quit Test</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerTop: {
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    ScreenNameText: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#295ac1",
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 40,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 5,
        marginBottom: 10,
    },
    headerQuestion: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#295ac1",
    },
    headerTime: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#295ac1",
    },
    timerContainer: {
        height: 8,
        width: '100%',
        backgroundColor: '#d3d3d3',
        borderRadius: 4,
        marginBottom: 15,
    },
    timerBar: {
        height: '100%',
        backgroundColor: '#295ac1',
        borderRadius: 4,
    },
    questionContainer: {
        marginVertical: 10,
        alignItems: "center",
    },
    questionText: {
        fontSize: 23,
        fontWeight: "bold",
        color: "#295ac1",
        textAlign: "center",
    },
    questionDescriptionContainer: {
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    questionDescriptionText: {
        fontSize: 23,
        color: "#295ac1",
        textAlign: "center",
    },


    answersContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 25,
    },

    answerButton: {
        width: "48%",
        backgroundColor: "#295ac1",
        paddingVertical: 20,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: "center",
    },
    answerText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },

    quitButton: {
        marginTop: 25,
        alignSelf: "center",
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    quitButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default TestScreen;
