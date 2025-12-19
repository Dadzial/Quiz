import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../Navigation/NavigationDrawler";

interface Answer {
    content: string;
    isCorrect: boolean;
}

interface Task {
    question: string;
    answers: Answer[];
    duration: number;
    type: string;
}

const TestScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const route = useRoute<RouteProp<DrawerParamList, "Test">>();
    const { testId } = route.params;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const res = await fetch(`https://tgryl.pl/quiz/test/${testId}`, { method: "GET" });
                const json = await res.json();
                const mappedTasks: Task[] = json.tasks.map((t: any) => ({
                    question: t.question,
                    answers: t.answers,
                    duration: t.duration,
                    type: t.type || json.name || "Unknown",
                }));
                setTasks(mappedTasks);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTest();
    }, [testId]);

    const handleAnswer = async (isCorrect: boolean) => {
        if (isCorrect) setScore(score + 1);

        const task = tasks[currentIndex];

        if (currentIndex + 1 < tasks.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            await sendResults("Jan", score + (isCorrect ? 1 : 0), tasks.length, task.type);
            navigation.navigate("Results");
        }
    };

    const sendResults = async (nick: string, score: number, total: number, type: string) => {
        try {
            const res = await fetch("http://tgryl.pl/quiz/result", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nick, score, total, type }),
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Error sending result");
        }
    };

    if (tasks.length === 0) return <Text>Loading...</Text>;
    const task = tasks[currentIndex];

    return (
        <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
            <Text style={styles.ScreenNameText}>
                Question {currentIndex + 1} of {tasks.length}
            </Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{task.question}</Text>
                </View>

                <View style={styles.answersContainer}>
                    {task.answers.map((answer, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.answerButton}
                            onPress={() => handleAnswer(answer.isCorrect)}
                        >
                            <Text style={styles.answerText}>{answer.content}</Text>
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
    mainContainer: { flex: 1, backgroundColor: "#ffffff", padding: 10 },
    ScreenNameText: { fontSize: 19, fontWeight: "bold", color: "#295ac1", textAlign: "center", marginVertical: 10 },
    scrollContent: { paddingBottom: 40 },
    questionContainer: { marginVertical: 15, alignItems: "center" },
    questionText: { fontSize: 20, fontWeight: "bold", color: "#295ac1", textAlign: "center" },
    answersContainer: { marginTop: 20 },
    answerButton: { backgroundColor: "#295ac1", paddingVertical: 15, borderRadius: 12, marginBottom: 12, alignItems: "center" },
    answerText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
    quitButton: { marginTop: 20, alignSelf: "center", backgroundColor: "#d9534f", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 15 },
    quitButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default TestScreen;
