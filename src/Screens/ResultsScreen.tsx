import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Result {
    nick: string;
    score: number;
    total: number;
    type: string;
    date: string;
}

const initialResults: Result[] = [
    { nick: "Marek", score: 18, total: 20, type: "historia", date: "2022-11-22" },
    { nick: "Alice", score: 15, total: 20, type: "matematyka", date: "2022-11-21" },
    { nick: "Bob", score: 12, total: 15, type: "geografia", date: "2022-11-20" },
];

const ResultsScreen = () => {
    const [results, setResults] = useState<Result[]>(initialResults);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Symulacja odświeżania, tutaj możesz pobierać dane z API
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const renderItem = ({ item }: { item: Result }) => (
        <View style={styles.tableRow}>
            <View style={[styles.rowCell, styles.colNick]}>
                <Text style={styles.rowText} numberOfLines={1} ellipsizeMode="tail">{item.nick}</Text>
            </View>
            <View style={[styles.rowCell, styles.colPoints]}>
                <Text style={styles.rowText}>{item.score}/{item.total}</Text>
            </View>
            <View style={[styles.rowCell, styles.colType]}>
                <Text style={styles.rowText}>{item.type}</Text>
            </View>
            <View style={[styles.rowCell, styles.colDate]}>
                <Text style={styles.rowText}>{item.date}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
            <Text style={styles.ScreenNameText}>Results</Text>
            <View style={styles.tableHeader}>
                <View style={[styles.headerCell, styles.colNick]}>
                    <Text style={styles.headerText}>Nick</Text>
                </View>
                <View style={[styles.headerCell, styles.colPoints]}>
                    <Text style={styles.headerText}>Score</Text>
                </View>
                <View style={[styles.headerCell, styles.colType]}>
                    <Text style={styles.headerText}>Type</Text>
                </View>
                <View style={[styles.headerCell, styles.colDate]}>
                    <Text style={styles.headerText}>Date</Text>
                </View>
            </View>

            <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    ScreenNameText: {
        textAlign: "center",
        fontSize: 19,
        fontWeight: "bold",
        color: "#295ac1",
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: "row",
        marginBottom: 4,
    },
    headerCell: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 4,
        backgroundColor: "#295ac1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        marginHorizontal: 2,
    },
    colNick: { flex: 2 },
    colPoints: { flex: 1 },
    colType: { flex: 1 },
    colDate: { flex: 1.5 },
    headerText: { fontSize: 14, fontWeight: "bold", color: "#ffffff" },
    tableRow: {
        flexDirection: "row",
        marginVertical: 2,
    },
    rowCell: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 4,
        backgroundColor: "#d0e1ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        marginHorizontal: 2,
    },
    rowText: { fontSize: 14, color: "#000000", textAlign: "center" },
});

export default ResultsScreen;
