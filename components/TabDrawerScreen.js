import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/*https://reactnavigation.org/docs/getting-started*/

const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  
    switch (routeName) {
      case 'Feed':
        return 'News Feed';
      case 'Messages':
        return 'My Messages';
      case 'Profile':
        return 'My Profile';
    }
  }

function HomeTabs({ navigation, route }) {

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: getHeaderTitle(route) });
      }, [navigation, route]);

    return (
        <Tab.Navigator>
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Messages" component={Messages} />
        </Tab.Navigator>
    );
}

function Profile({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Messages')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function Settings({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Settings Screen</Text>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

function Feed({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
}

function Messages({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

const Stack = createStackNavigator();

function HomeScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Tabs" component={HomeTabs} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

export default function Root() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home Drawer" component={HomeScreen} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Settings" component={Settings} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}