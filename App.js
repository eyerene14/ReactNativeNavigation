import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import DrawerScreen from './components/StackScreen';
import Root from './components/TabDrawerScreen';
import StructuredScreen from './components/StructuredScreens';
import ModalStack from './components/ModalStack';

export default function App() {
  return (
    /*<View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>*/
    < ModalStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
