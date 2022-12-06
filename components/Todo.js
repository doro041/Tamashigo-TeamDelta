import React from 'react';
import {Text,SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Button } from 'react-native';

const Todo = () => {
  const navigation = useNavigation()
  return(
    <SafeAreaView>
    <Text>Tamashigo is hungry</Text>
    <Button onPress={()=>navigation.navigate("Login"
    )} title = "Open title"></Button></SafeAreaView>

  );
};

export default Todo;