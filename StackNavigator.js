import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import NameChar from "./pages/Namechar";
import SignUp from "./pages/SignUp";
import ForgotPass from "./pages/ForgotPass";
import BeginningPage from './pages/BeginningPage';
import Login from './pages/Login';
import Home from './pages/Home';
import VerticalCalendar from './pages/CalendarView';
import Profile from './pages/Profile';
import Pomodoro  from './pages/Pomodoro'
import Todo from './pages/Todo';
import EggHatchAnimation from './pages/EggHatchAnimation';
import Settings from './pages/Settings';


import TermsandConditions from './components/TermsandConditions';


const Stack = createStackNavigator(); // Create a StackNavigator

const StackNavigator = () => { 
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
      <Stack.Screen name="EggHatchAnimation" component={EggHatchAnimation} />
        <Stack.Screen name="Beginning" component={BeginningPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TermsandConditions" component={TermsandConditions} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="NameChar" component={NameChar} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={VerticalCalendar} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Pomodoro" component={Pomodoro} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Settings" component={Settings} />


       
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
    
    </Stack.Group>

    </Stack.Navigator>
  );
};

export default StackNavigator;