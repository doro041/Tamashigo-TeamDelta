import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const auth = getAuth();
      
      // Check if the user is already logged in
      const user = auth.currentUser;
      if (user) {
        console.log('User is already logged in');
        navigation.navigate('NameChar');
        return;
      }
      
      // Log in the user with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      
      // Navigate to the new page
      console.log('User logged in successfully');
      navigation.navigate('NameChar');
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/Part.png')} style={[styles.background, { width: '100%', height: '100%' }]}>
      <Image source={require('../assets/PandaHead.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login</Text>
      </View>
    </ImageBackground>

  
    
    <TextInput
        style={styles.input}
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
  style={styles.input}
  value={password}
  onChangeText={(password) => setPassword(password)}
  placeholder="Password"
  secureTextEntry
/>

      <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.socialMedia}>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 50, height: 50, marginRight: 10 }]}>
    <Icon name="facebook" size={30} color="white" style={styles.icon} />
  </TouchableOpacity>

  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 50, height: 50, marginLeft: 10 }]}>
    <Icon name="google" size={25} color="white" style={styles.icon} />
  </TouchableOpacity>
</View>
      </View>


      <View style={styles.bottomContainer}>
  <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
   <Text>No account? <Text style={styles.SignUpText}> Sign up.</Text></Text>
  </TouchableOpacity>
</View>

 
        
      </View>
     

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
    
  },
  
  background: {
    width: 600,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 1,
    alignContent: 'center',
  },
  
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    marginTop: 10,
    alignContent: 'center',
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginBottom: '30%',
  },
  button: {
    width: '30%',
    borderRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    alignSelf:'center',
    marginBottom: 30, // Adjusted marginBottom
  },
  
  
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
  input: {
    width: 300,
    marginBottom: 10,
    backgroundColor: '#C8E6C9', // light green
    borderRadius: 20,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop:10,
    alignSelf: 'center',
    color: 'black',
    position: 'relative',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight:60,
    marginBottom: '20%',

  },
  forgotPasswordText: {
    color:  'navy',
    fontWeight: 'bold',
    fontSize: 15,

    },  
    SignUpText: {
        color: 'black',
        fontWeight: 'bold',
        },

 
    icon: {
      alignSelf: 'center',
    },
    socialMedia: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding:10,
      
      marginBottom: 10,
      // Add spacing between buttons
      paddingHorizontal: 50,
      marginHorizontal:30,
      alignSelf:'center',
    justifyContent: 'space-between', // Evenly space out buttons
    },
    bottomContainer: {
      position: 'absolute',
      bottom: 0,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    
   
    

});
export default Login;