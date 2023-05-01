import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'
import { firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore'


const NameChar = () => {
  // name, navigation are state variables
  const [name, setName] = useState('');
  const navigation = useNavigation();
 
  // onPress function to navigate to Home page
  const onPress = async () => {
    const auth = getAuth()
// store in the cloud firestore
    const ref = doc(firestore, 'tamashigoNames', auth.currentUser.uid)

    await setDoc(ref, {
      name: name
    })
// navigate to Home page
    navigation.navigate('Home', { name, onboarding: true });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/NameChar.png')} style={styles.background}>
        <Text style={styles.text}>Pick a name for your character:</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
          placeholder="Enter your character's name"
          placeholderTextColor="gray"
        />
        <Button title="Next" onPress={onPress} disabled={!name} />
        <Image source={require('../assets/Panda.png')} style={styles.image} />
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
  },
  background: {
    flex: 1,
    width: '120%',
    height: '120%',
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
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
});

export default NameChar;
