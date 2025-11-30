import {createDrawerNavigator, DrawerContentScrollView, DrawerNavigationProp, DrawerItemList} from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../Screens/HomeScreen';
import ResultsScreen from '../Screens/ResultsScreen';
import TestScreen from '../Screens/TestScreen';

type DrawerParamList = {
    Home: undefined;
    Results: undefined;
    Test: undefined;
};

type HeaderProps = {
    navigation: DrawerNavigationProp<DrawerParamList>;
};
type DrawerProps = any;

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomHeader = ({ navigation }: HeaderProps) => {
    return (
        <SafeAreaView
            edges={['top']}
            style={{ backgroundColor: '#fff' }}
        >
            <View style={{
                height: 60,
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
            }}>
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
};

const CustomDrawerContent = (props: DrawerProps) => {
    return (
        <DrawerContentScrollView {...props}>

            <View style={{ padding: 20, marginBottom: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#295ac1' }}>
                    Menu
                </Text>
            </View>


            <DrawerItemList {...props} />

        </DrawerContentScrollView>
    );
};

const NavDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={({ navigation }) => ({
                header: () => <CustomHeader navigation={navigation} />,
            })}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Results" component={ResultsScreen} />
            <Drawer.Screen name="Test" component={TestScreen} />
        </Drawer.Navigator>
    );
};

export default NavDrawer;
