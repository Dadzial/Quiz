import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../Navigation/NavigationDrawler";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import WelcomeScreen from "./WelcomeScreen";
import TestCard from "../components/TestCard";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

interface Quiz {
    id: string;
    name: string;
    description: string;
    tags?: string[];
    level?: string;
    numberOfTasks?: number;
}

const HomeScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular });

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

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch("https://tgryl.pl/quiz/tests", { method: "GET" });
                const json = await res.json();
                setQuizzes(json);
            } catch (error) {
                console.log("Fetch quizzes error:", error);
            }
        };
        fetchQuizzes();
    }, []);

    if (!fontsLoaded) return null;

    if (isFirstLaunch === true) {
        return <WelcomeScreen onAccept={handleAccept} />;
    }

    return (
        <SafeAreaView edges={["bottom"]} style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{ ...styles.scrollContent, flexGrow: 1 }}>
                <Text style={styles.ScreenNameText}>Available Quizzes</Text>

                <ScrollView>
                    {quizzes.map((quiz) => (
                        <TestCard
                            key={quiz.id}
                            title={quiz.name || "Untitled"}
                            description={quiz.description || "No description"}
                            onPress={() => navigation.navigate("Test", { testId: quiz.id })}
                        />
                    ))}
                </ScrollView>

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
        color: "#295ac1",
        marginVertical: 15,
        fontFamily: 'Inter_700Bold',
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
