import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

const testRows = [
    { nick: "PlayerOne_LongNickname", points: 120, type: "type1", date: "2025-01-01" },
    { nick: "Bob", points: 80, type: "type2", date: "2025-01-02" },
    { nick: "Alice", points: 150, type: "type3", date: "2025-01-03" },
    { nick: "SuperMegaUltraNickNameXYZ", points: 200, type: "type4", date: "2025-01-04" },
    { nick: "PlayerOne_LongNickname", points: 120, type: "type5", date: "2025-01-01" },
    { nick: "Bob", points: 80, type: "type1", date: "2025-01-02" },
    { nick: "Alice", points: 150, type: "type2", date: "2025-01-03" },
    { nick: "SuperMegaUltraNickNameXYZ", points: 200, type: "type3", date: "2025-01-04" },
    { nick: "PlayerOne_LongNickname", points: 120, type: "type4", date: "2025-01-01" },
    { nick: "Bob", points: 80, type: "type5", date: "2025-01-02" },
    { nick: "Alice", points: 150, type: "type1", date: "2025-01-03" },
    { nick: "SuperMegaUltraNickNameXYZ", points: 200, type: "type2", date: "2025-01-04" },
    { nick: "PlayerOne_LongNickname", points: 120, type: "type3", date: "2025-01-01" },
    { nick: "Bob", points: 80, type: "type4", date: "2025-01-02" },
    { nick: "Alice", points: 150, type: "type5", date: "2025-01-03" },
    { nick: "SuperMegaUltraNickNameXYZ", points: 200, type: "type1", date: "2025-01-04" },
    { nick: "PlayerOne_LongNickname", points: 120, type: "type2", date: "2025-01-01" },
    { nick: "Bob", points: 80, type: "type3", date: "2025-01-02" },
    { nick: "Alice", points: 150, type: "type4", date: "2025-01-03" },
    { nick: "SuperMegaUltraNickNameXYZ", points: 200, type: "type5", date: "2025-01-04" },
];

const ResultsScreen = () => {
    return (
        <SafeAreaView edges={['bottom']} style={styles.mainContainer}>
            <ScrollView
                contentContainerStyle={{ ...styles.scrollContent, flexGrow: 1 }}
                style={{ flex: 1 }}
            >
                <Text style={styles.ScreenNameText}>Results</Text>

                <View style={styles.tableHeader}>
                    <View style={[styles.headerCell, styles.colNick]}>
                        <Text style={styles.headerText}>Nick</Text>
                    </View>
                    <View style={[styles.headerCell, styles.colPoints]}>
                        <Text style={styles.headerText}>Points</Text>
                    </View>
                    <View style={[styles.headerCell, styles.colType]}>
                        <Text style={styles.headerText}>Type</Text>
                    </View>
                    <View style={[styles.headerCell, styles.colDate]}>
                        <Text style={styles.headerText}>Date</Text>
                    </View>
                </View>

                {testRows.map((row, index) => (
                    <View key={index} style={styles.tableRow}>
                        <View style={[styles.rowCell, styles.colNick]}>
                            <Text style={styles.rowText} numberOfLines={1} ellipsizeMode="tail">
                                {row.nick}
                            </Text>
                        </View>
                        <View style={[styles.rowCell, styles.colPoints]}>
                            <Text style={styles.rowText}>{row.points}</Text>
                        </View>
                        <View style={[styles.rowCell, styles.colType]}>
                            <Text style={styles.rowText}>{row.type}</Text>
                        </View>
                        <View style={[styles.rowCell, styles.colDate]}>
                            <Text style={styles.rowText}>{row.date}</Text>
                        </View>
                    </View>
                ))}
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
        fontSize: 19,
        fontWeight: "bold",
        color: "#295ac1",
        marginVertical: 10,
    },
    tableHeader: {
        flexDirection: "row",
        marginBottom: 10,
    },
    headerCell: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: "#295ac1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginHorizontal: 2,
    },
    colNick: { flex: 2 },
    colPoints: { flex: 1 },
    colType: { flex: 1 },
    colDate: { flex: 1.8 },
    headerText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#ffffff",
    },
    tableRow: {
        flexDirection: "row",
        marginVertical: 4,
        marginHorizontal: 2,
    },
    rowCell: {
        flex: 1,
        paddingVertical: 6,
        paddingHorizontal: 4,
        backgroundColor: "#295ac1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginHorizontal: 2,
    },
    rowText: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#ffffff",
        textAlign: "center",
    },
});

export default ResultsScreen;
