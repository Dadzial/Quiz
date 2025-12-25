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
}

const TestScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const route = useRoute<RouteProp<DrawerParamList, "Test">>();
    const { testId } = route.params;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [testType, setTestType] = useState("");

    useEffect(() => {
        const fetchTest = async () => {
            console.log("FETCH TEST ID:", testId);

            try {
                const res = await fetch(`https://tgryl.pl/quiz/test/${testId}`);
                console.log("FETCH STATUS:", res.status);

                const json = await res.json();
                console.log("FULL TEST RESPONSE:", json);


                setTestType(json.tags[0]);
                console.log("TEST TYPE:", json.tags[0]);

                console.log("TASKS COUNT:", json.tasks?.length);

                const mappedTasks: Task[] = json.tasks.map((t: any, i: number) => {
                    console.log(`TASK ${i}:`, t.question);
                    return {
                        question: t.question,
                        answers: t.answers,
                        duration: t.duration,
                    };
                });

                setTasks(mappedTasks);
            } catch (e) {
                console.log("FETCH ERROR:", e);
            }
        };

        fetchTest();
    }, [testId]);

    const sendResults = async (finalScore: number) => {
        const payload = {
            nick: "DamianD",
            score: finalScore,
            total: tasks.length,
            type: testType,
        };

        console.log("POST PAYLOAD:", payload);

        try {
            const res = await fetch("https://tgryl.pl/quiz/result", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            console.log("POST STATUS:", res.status);
        } catch (e) {
            console.log("POST ERROR:", e);
            Alert.alert("Error", "POST failed");
        }
    };

    const handleAnswer = async (isCorrect: boolean) => {
        console.log("ANSWER CLICKED:", isCorrect);

        const newScore = isCorrect ? score + 1 : score;
        console.log("NEW SCORE:", newScore);

        if (currentIndex + 1 < tasks.length) {
            setScore(newScore);
            setCurrentIndex(currentIndex + 1);
            console.log("NEXT QUESTION INDEX:", currentIndex + 1);
        } else {
            console.log("TEST FINISHED");
            await sendResults(newScore);
            navigation.navigate("Results");
        }
    };

    if (!tasks.length) {
        console.log("NO TASKS YET");
        return <Text>Loading...</Text>;
    }

    const task = tasks[currentIndex];

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.ScreenNameText}>
                Question {currentIndex + 1} of {tasks.length}
            </Text>

            <ScrollView>
                <Text style={styles.questionText}>{task.question}</Text>

                {task.answers.map((a, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.answerButton}
                        onPress={() => handleAnswer(a.isCorrect)}
                    >
                        <Text style={styles.answerText}>{a.content}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, padding: 10 },
    ScreenNameText: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
    questionText: { fontSize: 20, marginVertical: 20, textAlign: "center" },
    answerButton: {
        backgroundColor: "#295ac1",
        padding: 15,
        borderRadius: 10,
        marginVertical: 6,
    },
    answerText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});

export default TestScreen;
