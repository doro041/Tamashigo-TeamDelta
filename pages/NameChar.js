import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getAuth } from 'firebase/auth'
import { firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore'


const NameChar = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();
 
  const onPress = async () => {
    const auth = getAuth()

    const ref = doc(firestore, 'tamashigoNames', auth.currentUser.uid)

    await setDoc(ref, {
      name: name
    })

    navigation.navigate('Home', { name, onboarding: true });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ImageBackground source={require('../assets/NameChar.png')} style={styles.background}>
        <Text style={styles.text}>Pick a name for your character:</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
          placeholder="Enter your character's name"
          placeholderTextColor="gray"
        />
        <Button title="Next" onPress={onPress} />
        <Image source={require('../assets/Panda.png')} style={styles.image} />
      </ImageBackground>
      <Footer />
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
    width: '100%',
    height: '100%',
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
