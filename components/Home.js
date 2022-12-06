import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { Image } from 'react-native'; // Import the Image component from the correct module
import CircleButton from './CircleButton';
import {NavigationBar} from 'navigationbar-react-native';

const Home = () => {
  const navigation = useNavigation();

  return ( 
    <View>
    <NavigationBar
    backgroundColor="#4169E1"
    title="Tamashigo app"
    titleColor="white"
  />
  
    <SafeAreaView> 
      <Text>Tamashigo app</Text>
      <Button onPress={() => navigation.navigate('Todo')} title="ToDoList" />
      <Image
        source={require('../assets/inage.png')} 
        style={{ width: 200, height: 200 }}
      />
      

    </SafeAreaView>
</View>
  );
};

export default Home;