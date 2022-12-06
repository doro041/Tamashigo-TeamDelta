import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StackNavigator from "./StackNavigator";
import Home from './components/Home';
import Todo from "./components/Todo";
import Login from "./components/Login";
import { StyleSheet } from 'react-native';
import { StatusBar } from 'react-native'; // Import the StatusBar component from the react-native package




const App = () => {
return (
<NavigationContainer>
<StackNavigator />
<StatusBar style="dark" />
</NavigationContainer>
);
};


export default App;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#8C83FB',
},
});