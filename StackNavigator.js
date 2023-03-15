import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Namechar from "./pages/Namechar";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
import BeginningPage from './pages/BeginningPage';
import Login from './pages/Login';
import Home from './pages/Home';
import TermsandConditions from './components/TermsandConditions';


const Stack = createStackNavigator(); // Create a StackNavigator

const StackNavigator = () => { 
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Beginning" component={BeginningPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TermsandConditions" component={TermsandConditions} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="Namechar" component={Namechar} />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Group>
     
    </Stack.Navigator>
  );
};

export default StackNavigator;