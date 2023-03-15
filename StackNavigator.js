import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Namechar from "./pages/Namechar";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
import BeginningPage from './pages/BeginningPage';
import Login from './pages/Login';


const Stack = createStackNavigator(); // Create a StackNavigator

const StackNavigator = () => { 
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name = "Beginning" component={BeginningPage} />
        <Stack.Screen name = "Login" component={Login} />
        <Stack.Screen name = "SignUp" component={SignUp} />
        <Stack.Screen name = "ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Character Name" component={Namechar} />
        
       

      </Stack.Group> 
    </Stack.Navigator>
  );
};


export default StackNavigator;