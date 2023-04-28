import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';


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

          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1, color: 'black', fontSize: 20, fontWeight: 'bold' }]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1, color: 'black', fontSize: 20, fontWeight: 'bold' }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>setting</Text>
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
    marginTop: '40%',
    alignContent: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '30%',
    alignContent: 'center',
    fontStyle: 'italic'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
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