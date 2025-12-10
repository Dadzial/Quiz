import {Text, TouchableOpacity} from "react-native";
import {StyleSheet} from "react-native";

interface testCardProps {
    title: string;
    description: string;
    onPress?: () => void
}

const TestCard = ({title, description, onPress}: testCardProps) => {
    return (
        <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#295ac1',
        borderRadius:15,
        marginVertical:10,
        marginHorizontal:10,
    },
    titleText: {
        fontSize: 16,
        marginLeft:10,
        fontWeight: 'bold',
        color: '#ffffff',
        marginVertical: 10,
    },
    descriptionText: {
        fontSize: 14,
        marginLeft:10,
        color: '#ffffff',
    },
});

export default TestCard;