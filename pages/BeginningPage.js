import React from 'react';
import { View, Text, StyleSheet, Button,Image, ImageBackground } from 'react-native';


const BeginningPage = () => {
  return (
    <View style={styles.container}>
      
      <ImageBackground source={require('../assets/Bg.png')} style={styles.background}>
      
       
     
      
      
     
      <Image source={require('../assets/logo1.png')} style={{width:200,height:300,resizeMode: 'contain'}}/>
      <Text style={styles.title}>Welcome to Tamashigo</Text>
      <Text style={styles.subtitle}>Where productivity meets fun!</Text>
     
    </ImageBackground>
   
   
      <View style={styles.buttonContainer}>
        <Button style={styles.button}title="Log In" onPress={() => navigation.navigate('Login')} />

       <Button style={styles.button}title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      
       
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
  title:  {
    fontSize: 30,
    fontWeight: 'bold',
      color: 'black',
      marginBottom: '20%',
      marginLeft: '10%',
      marginTop: '40%',
      alignContent: 'center',
      

    },
  
  subtitle:{
    fontSize: 20,
    fontWeight:'bold',
    marginBottom: '30%',
    marginLeft: '10%',
    alignContent: 'center',
    fontStyle: 'italic'
    

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginTop: '20%',
  },
  button: {
    width: '48%',
    buttonRadius: 40,
  },

  
      
      background: {
        flex:1,
        width: '100%',
        height: '60%',
        alignContent : 'flex-start',
      },
    });



export default BeginningPage;


