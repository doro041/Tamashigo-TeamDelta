import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircleButton from './CircleButton';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { Animated } from 'react-native';



const styles = StyleSheet.create({
  levelContainer: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    absolute : true ,
    height: 50,
    width: 200,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignItems:'center',
    alignSelf:'center',
  },
  Button:{
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    absolute : true,
    height: 50,
    width: 200,
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color : 'white',
  },
});

const Home  = ({ route })=> 
  

{
  const { name } = route.params;
  const navigation = useNavigation(); 
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0); 
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
  </View>
 <View>
 <View>
      <Text>{`Welcome, ${name}!`}</Text>
    </View>
     

<View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, width:200, height:50,alignItems: 'flex-start',marginTop:10 }}>

<Text style={{ fontSize: 30 }}>xp: {experience} ❤️</Text>


</View>
        <View style={styles.levelContainer}>
        <Text style ={styles.text}>Level: {level}</Text>
       
</View>
<Button
  style={{
    
    top: 0,
    left: 0,
    right: 0,
   
    width: 200,
    height: 25,
    alignItems: 'center',

  }}
  onPress={() => {
    setExperience(experience + 10);
    if (experience >= 100) {
      setLevel(level + 1);
      setExperience(0);
      
    }
  }}
  title="XP"



/>
</View>
 
 
        <Image
         
          source={require('../components/Egg.png')} 
          style={{ 
            width: 500,
            height: 500,
            alignSelf: 'center',
            margin: 20
          }}
        />
        <CircleButton onPress={() => navigation.navigate('Todo')} size={50} color="#000" />
        
       
       
      
      
    </SafeAreaView>
  );
        };

export default Home;