import {createDrawerNavigator, DrawerContentScrollView, DrawerNavigationProp, DrawerItemList} from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../Screens/HomeScreen';
import ResultsScreen from '../Screens/ResultsScreen';
import TestScreen from '../Screens/TestScreen';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Quiz {
    id: string;
    name: string;
    description: string;
    tags?: string[];
    level?: string;
    numberOfTasks?: number;
}

export type DrawerParamList = {
    Home: undefined;
    Results: undefined;
    Test: { testId: string };
};

type HeaderProps = {
    navigation: DrawerNavigationProp<DrawerParamList>;
};
type DrawerProps = any;

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomHeader = ({ navigation }: HeaderProps) => (
    <SafeAreaView edges={['top']} style={{ backgroundColor: '#fff' }}>
        <View
            style={{
                height: 40,
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 40,
            }}
        >
            <TouchableOpacity
                style={{ position: 'absolute', left: 15 }}
                onPress={() => navigation.openDrawer()}
            >
                <Text style={{ fontSize: 24, color: '#295ac1' }}>☰</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#295ac1' }}>
                Quizzes
            </Text>
        </View>
    </SafeAreaView>
);

const CustomDrawerContent = (props: DrawerProps) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        const loadFromStorage = async () => {
            const saved = await AsyncStorage.getItem("quizzes");
            if (saved) setQuizzes(JSON.parse(saved));
        };
        loadFromStorage();
    }, []);

    const drawRandomTest = () => {
        if (!quizzes.length) return;

        const random = quizzes[Math.floor(Math.random() * quizzes.length)];
        props.navigation.navigate("Test", { testId: random.id });
    };

    const downloadTests = async () => {
        try {
            const res = await fetch("https://tgryl.pl/quiz/tests");
            const json = await res.json();
            await AsyncStorage.setItem("quizzes", JSON.stringify(json));
            setQuizzes(json);
            console.log("TESTS DOWNLOADED");
        } catch (e) {
            console.log("DOWNLOAD ERROR:", e);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ padding: 20, marginBottom: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#295ac1' }}>
                    Menu
                </Text>
            </View>

            <DrawerItemList {...props} />

            <View style={{ height: 1, backgroundColor: "#295ac1", opacity: 0.5, marginVertical: 15 }} />

            <TouchableOpacity
                onPress={drawRandomTest}
                style={{
                    padding: 15,
                    marginBottom: 10,
                    backgroundColor: '#295ac1',
                    borderRadius: 15,
                    alignItems: 'center'
                }}
            >
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#ffffff' }}>
                    Draw test
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={downloadTests}
                style={{
                    padding: 15,
                    backgroundColor: '#295ac1',
                    borderRadius: 15,
                    alignItems: 'center'
                }}
            >
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#ffffff' }}>
                    Download tests
                </Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const NavDrawer = () => (
    <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />,
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Test" component={TestScreen} />
        <Drawer.Screen name="Results" component={ResultsScreen} />
    </Drawer.Navigator>
);

export default NavDrawer;
