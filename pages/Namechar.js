import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput,ImageBackground,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Header from '../components/Header';
const Namechar = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Home', { name });
  };

  return (
    <View style={styles.container}>
      <Header/>
      <ImageBackground source={require('../assets/NameChar.png')} style={styles.background}>
     
     
    
   
      <Text style={styles.text}>Pick a name for your character:</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
     
      <TouchableOpacity style={styles.imageButton} onPress={onPress}>
      <Image source={require('../assets/Panda.png')} style={{ margin: '10%', width: 200, height: 300,justifyContent:'center' }} />
      </TouchableOpacity>
      
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    ImageBackground: '../assets/NameChar.png'



  },
  background: {
    flex: 1,
    width: '100%',
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    },
  text: {
    fontSize: 40,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',

    
  },
  input: {
    width: '80%',
    height: 80,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    fontSize: 20,
    

  },
  imageButton: {
    position: 'absolute',
    bottom: 0,
    width: '40%',
    height: 'auto',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  
});

export default Namechar;