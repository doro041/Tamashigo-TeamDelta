import React from 'react';
import { View, Text, StyleSheet, Button,Image, ImageBackground } from 'react-native';


const BeginningPage = () => {
  return (
    <View style={styles.container}>
      
      <ImageBackground source={require('../assets/Bg.png')} style={styles.background}>
      
       
     
      
      
     
      <Image source={require('../assets/logo1.png')} style={{width:200,height:300}}/>
      <Text style={styles.title}>Welcome to Tamashigo</Text>
      <Text style={styles.subtitle}>Where fun meets productivity</Text>
    </ImageBackground>
   
    <View style={styles.buttonContainer}>
      <Button style={styles.button1} title="Login" onPress={() => console.log('Login pressed')} />

<Button style={styles.button2}title="Sign Up" onPress={() => console.log('Sign Up pressed')} />
      
       
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
      margin: '10%',
      marginLeft: '10%',
      fontStyle: 'italic'

    },
  
  subtitle:{
    fontSize: 18,
    fontWeight:'bold',
    marginBottom: 20,
    marginLeft: '20%',
    fontStyle: 'italic'
    

  },

  button1 : {
    backgroundColor: 'white',
      color: 'black',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '20%',
      padding: "2%",
      fontSize:  27,
      marginTop: '70%',
      justifyContent: 'flex-end',
    },

  button2:{
    backgroundColor: '#3A59FF',
    color: 'white',
    width: "75%",
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: "2%",
    fontSize:  27,
    marginTop: '10%'
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    color: 'black',

    

  },
  
      
      background: {
        flex:1,
        width: '100%',
        height: '60%'
      },
    });



export default BeginningPage;


