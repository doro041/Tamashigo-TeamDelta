import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';

const BeginningPage = () => {
  return (
    <View style={styles.container}>
   
        <ImageBackground source={require('../assets/begin.png')} />
      <Text style={styles.title}>Welcome to Tamashigo</Text>
      <Text style={styles.title}>Where fun meets productivity</Text>
      
      <View style={styles.buttonContainer}>

        <Button style={styles.button} title="Login" onPress={() => console.log('Login pressed')} />
        <Button title="Sign Up" onPress={() => console.log('Sign Up pressed')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ImageBackground: '../assets/begin.png',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    style: 'italic',
  },
  button : {
    color: 'black'
    },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    color: 'black'
  },
  image : { 
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
    }
});

export default BeginningPage;


