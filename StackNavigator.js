import React, { Profiler } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NameChar from "./pages/NameChar";
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
import About from './pages/About';
import Shop from './pages/Shop';
import TermsandConditions from './components/TermsandConditions';
import { CopilotProvider } from "react-native-copilot";
const Stack = createStackNavigator();

const StackNavigator = ({ user }) => {
  return (
    <CopilotProvider>
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? 'Home' : 'Beginning'}
    >
      <Stack.Group>
        <Stack.Screen name="Beginning" component={BeginningPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TermsandConditions" component={TermsandConditions} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="EggHatchAnimation" component={EggHatchAnimation} />
        <Stack.Screen name="NameChar" component={NameChar} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={VerticalCalendar} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Pomodoro" component={Pomodoro} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Shop" component={Shop} />
  
       
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
    
    </Stack.Group>

    </Stack.Navigator>
    </CopilotProvider>
  );
};

export default StackNavigator;