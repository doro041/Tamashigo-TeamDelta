import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Namechar from "./pages/Namechar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import BeginningPage from './pages/BeginningPage';
import Login from './pages/Login';
import ShortBreak from './pages/ShortBreak'


const Stack = createStackNavigator(); // Create a StackNavigator

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Beginning" component={BeginningPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Character Name" component={Namechar} />
        <Stack.Screen name="ShortBreak" component={ShortBreak} />



      </Stack.Group>
    </Stack.Navigator>
  );
};


export default StackNavigator;