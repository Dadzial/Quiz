import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
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
}

const tasks: Task[] = [
    {
        question: "Który wódz po śmierci Gajusza Mariusza prowadził wojnę domową z Sullą?",
        answers: [
            { content: "LUCJUSZ CYNNA", isCorrect: true },
            { content: "JULIUSZ CEZAR", isCorrect: false },
            { content: "LUCJUSZ MURENA", isCorrect: false },
            { content: "MAREK KRASSUS", isCorrect: false },
        ],
        duration: 30,
    },
    {
        question: "Stolica Francji to?",
        answers: [
            { content: "Paryż", isCorrect: true },
            { content: "Lyon", isCorrect: false },
            { content: "Marsylia", isCorrect: false },
            { content: "Nicea", isCorrect: false },
        ],
        duration: 20,
    },
];

const TestScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);

    const handleAnswer = (isCorrect: boolean) => {
        if (isCorrect) setScore(score + 1);
        if (currentIndex + 1 < tasks.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate("Results"); // po teście przejście do Results
        }
    };

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

                <TouchableOpacity
                    style={styles.quitButton}
                    onPress={() => navigation.navigate("Home")}
                >
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
    answerButton: {
        backgroundColor: "#295ac1",
        paddingVertical: 15,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: "center",
    },
    answerText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
    quitButton: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#d9534f",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    quitButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default TestScreen;
