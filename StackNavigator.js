import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "./components/Home" ;
import Todo from "./components/Todo";
import Modal from "./components/Modal";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Todo" component={Todo} />
      </Stack.Group> 
      <Stack.Group screenOptions={{presentation: "Login"}}>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;