import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  
      // Check if authentication credentials are stored in AsyncStorage
      const authToken = await AsyncStorage.getItem('authToken');
      if (!authToken) {
        console.log('No saved authentication credentials found');
        return;
      }
  
      // Use the saved authentication credentials to log in the user
      const credential = firebase.auth.AuthCredential.fromJWT(authToken);
      const userCredential = await signInWithCredential(auth, credential);
      console.log('User logged in successfully!');
  
      // Navigate to the new page
      navigation.navigate('NameChar');
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/PartofLogo.png')} style={styles.background}>
        <Image source={require('../assets/PandaHead.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
        <Text style={styles.title}>Welcome Back.</Text>
        <Text style={styles.subtitle}>Login</Text>
      </ImageBackground>

    
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      /> 
      <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
    
  <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={() => handleLogin(email, password)}>
    <Text style={styles.buttonText}>LOGIN</Text>
  </TouchableOpacity>

  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 30, height: 30 }]}>
    <Icon name="facebook" size={25} color="white" style={styles.icon} />
  </TouchableOpacity>
  
  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 30, height: 30 }]}>
    <Icon name="google" size={25} color="white" style={styles.icon} />
  </TouchableOpacity>
  
</View>

<TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
      <Text> No account?</Text><Text style={styles.SignUpText}>Sign up.</Text>
      </TouchableOpacity>
 
        
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
    marginBottom: '10%',
   
    marginTop: '10%',
    alignContent: 'center',
  },

  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '10%',
    
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    paddingLeft: 20,
    marginBottom: 20,
    marginTop:20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: '20%',

  },
  forgotPasswordText: {
    color: 'blue',
    fontWeight: 'bold',
    },  
    SignUpText: {
        color: 'black',
        fontWeight: 'bold',
        },

  icon: {
    padding: 10,
    marginTop:10,


    },

});
export default Login;
