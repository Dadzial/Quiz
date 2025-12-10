import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

interface WelcomeScreenProps {
    onAccept: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAccept }) => {
    return (
        <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.screenNameText}>Welcome to Quizzes</Text>

                <Text style={styles.subtitle}>App Rules:</Text>
                <View style={styles.rulesList}>
                    <Text style={styles.ruleItem}>1. Each user can take quizzes only once per day.</Text>
                    <Text style={styles.ruleItem}>2. Do not share answers with other users.</Text>
                    <Text style={styles.ruleItem}>3. Quiz results are stored locally on your device.</Text>
                    <Text style={styles.ruleItem}>4. Respect other players and do not use unfair methods.</Text>
                    <Text style={styles.ruleItem}>5. The app is intended for educational and entertainment purposes only.</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={onAccept}>
                    <Text style={styles.buttonText}>Accept</Text>
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
    content: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    screenNameText: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: "#295ac1",
        marginVertical: 15,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#333",
    },
    rulesList: {
        marginVertical: 10,
    },
    ruleItem: {
        fontSize: 16,
        marginBottom: 8,
        color: "#555",
    },
    button: {
        backgroundColor: '#295ac1',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff",
    },
});

export default WelcomeScreen;
