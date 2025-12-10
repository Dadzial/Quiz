import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../Navigation/NavigationDrawler";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import WelcomeScreen from "./WelcomeScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Task {
    title: string;
    description: string;
}

const tasks: Task[] = [
    { title: "Historia Rzymu", description: "Test wiedzy o historii starożytnego Rzymu" },
    { title: "Geografia Europy", description: "Sprawdź swoją wiedzę geograficzną" },
    { title: "Matematyka", description: "Test z matematyki dla zaawansowanych" },
    { title: "Biologia", description: "Quiz biologiczny z ciekawostkami" },
];

const HomeScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

    const handleAccept = async () => {
        try {
            await AsyncStorage.setItem("hasLaunched", "true");
            setIsFirstLaunch(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const checkFirstLaunch = async () => {
            try {
                const hasLaunched = await AsyncStorage.getItem("hasLaunched");
                setIsFirstLaunch(hasLaunched === null);
            } catch (error) {
                console.log("Error in checkFirstLaunch:", error);
            }
        };
        checkFirstLaunch();
    }, []);

    if (isFirstLaunch === true) {
        return <WelcomeScreen onAccept={handleAccept} />;
    }

    return (
        <SafeAreaView edges={["bottom"]} style={styles.mainContainer}>
            <ScrollView
                contentContainerStyle={{ ...styles.scrollContent, flexGrow: 1 }}
                style={{ flex: 1 }}
            >
                <Text style={styles.ScreenNameText}>Available Quizzes</Text>

                {tasks.map((task, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.quizCard}
                        onPress={() => navigation.navigate("Test", { taskIndex: index })}
                    >
                        <Text style={styles.quizTitle}>{task.title}</Text>
                        <Text style={styles.quizDescription}>{task.description}</Text>
                    </TouchableOpacity>
                ))}

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.footerButton}
                        onPress={() => navigation.navigate("Results")}
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
        backgroundColor: "#ffffff",
    },
    scrollContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    ScreenNameText: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#295ac1",
        marginVertical: 15,
    },
    quizCard: {
        backgroundColor: "#dce6ff",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#295ac1",
    },
    quizDescription: {
        fontSize: 14,
        color: "#295ac1",
        marginTop: 5,
    },
    footer: {
        marginTop: 20,
        alignItems: "center",
    },
    footerButton: {
        backgroundColor: "#295ac1",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    footerButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default HomeScreen;
