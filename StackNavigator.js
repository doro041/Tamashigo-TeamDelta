import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "./pages/Home" ;
import Todo from "./pages/Todo";
import Namechar from "./pages/Namechar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


const Stack = createStackNavigator(); // Create a StackNavigator

const StackNavigator = () => { 
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name="Character Name" component={Namechar} />
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name ="Profile" component={Profile} />
         <Stack.Screen name="Settings" component={Settings} />
         <Stack.Screen name="Todo" component={Todo} />
       

      </Stack.Group> 
    </Stack.Navigator>
  );
};


export default StackNavigator;