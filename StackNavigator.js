import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "./components/Home" ;
import Todo from "./components/Todo";


const Stack = createStackNavigator(); // Create a StackNavigator

const StackNavigator = () => { 
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Group>
         <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Todo" component={Todo} />
      </Stack.Group> 
    </Stack.Navigator>
  );
};


export default StackNavigator;