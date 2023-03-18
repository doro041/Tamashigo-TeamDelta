import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from "./StackNavigator";
import { StatusBar } from 'react-native'; // Import the StatusBar component from the react-native package
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { firebaseConfig } from './firebase.js';




const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </SafeAreaView>

    );
};


export default App;

