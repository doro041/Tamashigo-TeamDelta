import React from 'react';
import {View,Text,SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Button } from 'react-native';

const Login = () => {
  const navigation = useNavigation(); 
  return(
    <SafeAreaView>
    <Text>This is a modal</Text>
    <Button onPress={()=>navigation.navigate("Home"
    )} title = "ToDoList"/></SafeAreaView>
  );
};

export default Login;