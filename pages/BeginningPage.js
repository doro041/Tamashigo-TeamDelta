import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import LevelUp from '../LevelUp';

const BeginningPage = ({ navigation }) => {
  return (

    <View style={styles.container}>

      <ImageBackground source={require('../assets/Bg.png')} style={styles.background}>
        <Image source={require('../assets/logo1.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
        <Text style={styles.title}>Welcome to Tamashigo</Text>
        <Text style={styles.subtitle}>Where productivity meets fun!</Text>
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={() => navigation.navigate('Login')}
        >

          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1, color: 'black', fontSize: 20, fontWeight: 'bold' }]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black', borderColor: 'black', borderWidth: 1, color: 'black', fontSize: 20, fontWeight: 'bold' }]}
          onPress={() => navigation.navigate('ShortBreak')}
        >
          <Text style={styles.buttonText}>ShortBreak</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '20%',
    marginLeft: '10%',
    marginTop: '40%',
    alignContent: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '30%',
    marginLeft: '10%',
    alignContent: 'center',
    fontStyle: 'italic'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginBottom: '30%',

  },
  button: {
    width: '48%',
    borderRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
});

export default BeginningPage;
