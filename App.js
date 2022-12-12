import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from "./StackNavigator";

import { StatusBar } from 'react-native'; // Import the StatusBar component from the react-native package
import { StyleSheet, Text } from 'react-native';





const App = () => {
return (
<NavigationContainer>
<StackNavigator />

<StatusBar style="dark" />

</NavigationContainer>
);
};


export default App;

