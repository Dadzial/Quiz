import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { DrawerParamList } from "../Navigation/NavigationDrawler";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import WelcomeScreen from "./WelcomeScreen";
import TestCard from "../components/TestCard";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { shuffle } from "lodash";
import {useNetInfo} from "@react-native-community/netinfo";

interface Quiz {
    id: string;
    name: string;
    description: string;
    tags?: string[];
    level?: string;
    numberOfTasks?: number;
}

const DATA_KEY = "quizzes";
const LAST_FETCH_KEY = "lastFetch";

const HomeScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [fontsLoaded] = useFonts({ Inter_700Bold, Inter_400Regular });
    const netInfo = useNetInfo();

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
        const fetchAndStoreQuizzes = async () => {
            try {
                const res = await fetch("https://tgryl.pl/quiz/tests");
                const json = await res.json();
                const shuffled = shuffle(json);

                await AsyncStorage.setItem(DATA_KEY, JSON.stringify(shuffled));
                await AsyncStorage.setItem(LAST_FETCH_KEY, Date.now().toString());

                setQuizzes(shuffled);
            } catch (e) {
                console.log("FETCH ERROR:", e);
            }
        };

        const checkLastFetch = async () => {
            const lastFetch = await AsyncStorage.getItem(LAST_FETCH_KEY);
            const now = Date.now();

            if (!lastFetch || now - parseInt(lastFetch) > 86400000) {
                await fetchAndStoreQuizzes();
            } else {
                const saved = await AsyncStorage.getItem(DATA_KEY);
                if (saved) setQuizzes(shuffle(JSON.parse(saved)));
            }
        };

        checkLastFetch();
    }, []);

    useFocusEffect(
        useCallback(() => {
            const load = async () => {
                const saved = await AsyncStorage.getItem(DATA_KEY);

                if (saved) {
                    setQuizzes(shuffle(JSON.parse(saved)));
                } else if (netInfo.isConnected) {
                    try {
                        const res = await fetch("https://tgryl.pl/quiz/tests");
                        const json = await res.json();
                        setQuizzes(shuffle(json));
                        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(shuffle(json)));
                        await AsyncStorage.setItem(LAST_FETCH_KEY, Date.now().toString());
                    } catch (e) {
                        console.log("FETCH ERROR:", e);
                    }
                }
            };
            load();
        }, [])
    );

    if (!fontsLoaded) return null;
    if (isFirstLaunch === true) return <WelcomeScreen onAccept={handleAccept} />;

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
    mainContainer: { flex: 1, backgroundColor: "#ffffff" },
    scrollContent: { paddingHorizontal: 10, paddingBottom: 20 },
    ScreenNameText: {
        textAlign: "center",
        fontSize: 22,
        color: "#295ac1",
        marginVertical: 15,
        fontFamily: 'Inter_700Bold',
    },
    footer: { marginTop: 20, alignItems: "center" },
    footerButton: {
        backgroundColor: "#295ac1",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    footerButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
