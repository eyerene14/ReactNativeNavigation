import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/*https://reactnavigation.org/docs/getting-started*/

const Tab = createBottomTabNavigator();

function HomeTabs() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Sign In" component={SignIn} />
            <Tab.Screen name="Sign Up" component={SignUp} />
        </Tab.Navigator>
    );
}

function SignIn({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Sign In Screen</Text>
            <Button title="Sign In" onPress={() => navigation.navigate('LoggedIn',
                {
                    isLoggedIn: true,
                    otherParam: 'Info sent from home screen via route',
                }
            )} />
            <Button title="Sign Up" onPress={() => navigation.navigate('Sign Up',
                {
                    isLoggedIn: false,
                    otherParam: 'Info sent from home screen via route',
                })} />
        </View>
    );
}

function SignUp({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Sign Up Screen</Text>
            <Button title="Sign Up" onPress={() => navigation.navigate('LoggedIn',
                {
                    isLoggedIn: true,
                    otherParam: 'Info sent from home screen via route',
                }
            )} />
            <Button title="Sign In" onPress={() => navigation.navigate('Sign In',
                {
                    isLoggedIn: false,
                    otherParam: 'Info sent from home screen via route',
                }
            )} />
        </View>
    );
}

function UserScreens() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={WelcomeScreen} initialParams={{isLoggedIn : true}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{isLoggedIn : true}}/>
        </Tab.Navigator>
    );
}

function WelcomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Welcome</Text>
            <Button title="Home" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Profile</Text>
            <Button title="Profile" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

function HelpScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Help!</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function ContactScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Contact!</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function AboutScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>About!</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function LogOutScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Log Out</Text>
            <Button title="Sign Up" onPress={() => navigation.navigate('Intro',
                {
                    isLoggedIn: false,
                    otherParam: 'Info sent from home screen via route',
                }
            )} />
        </View>
    );
}

// Define multiple groups of screens in objects like this
const commonScreens = {
    Intro: HomeTabs,
    Help: HelpScreen,
    About: AboutScreen,
    Contact: ContactScreen,
};

const authScreens = {
    SignIn: SignIn,
    SignUp: SignUp,
};

const userScreens = {
    LoggedIn: UserScreens,
    Home: WelcomeScreen,
    Profile: ProfileScreen,
    LogOut: LogOutScreen,
};

const Stack = createStackNavigator();

function StackScreens({navigation, route}) {
    const [isLoggedIn] = React.useState('');

    return (
        <Stack.Navigator>
            {Object.entries({
                // Use the screens normally
                ...commonScreens,
                // Use some screens conditionally based on some condition
                ...({isLoggedIn} ? userScreens : authScreens),
            }).map(([name, component]) => (
                <Stack.Screen name={name} component={component}
                    options={{
                        headerRight: () => (
                            <Button
                                onPress={() => navigation.navigate('Help')}
                                title="Help"
                                color="#fff"
                            />
                        ),
                    }}
                />
            ))}
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

export default function StructuredScreen() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home Drawer" component={StackScreens}/>
                <Drawer.Screen name="Help" component={HelpScreen} />
                <Drawer.Screen name="Contact" component={ContactScreen} />
                <Drawer.Screen name="About" component={AboutScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}