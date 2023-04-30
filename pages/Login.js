import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const Login = ({ navigation }) => {
  console.log('Login component rendered');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedInUser) => {
      console.log('onAuthStateChanged triggered', loggedInUser);
      if (loggedInUser) {
        // Store the user in AsyncStorage
        try {
          console.log('Storing user in AsyncStorage', loggedInUser);
          await AsyncStorage.setItem('user', JSON.stringify(loggedInUser));
        } catch (error) {
          console.log('Error storing user in AsyncStorage', error);
        }
  
        // Update the local user state
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        console.log('savedUser from AsyncStorage', savedUser);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.log('Error retrieving user from AsyncStorage', error);
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);
  async function handleLogin() {
    try {
      // Check if the user is already logged in
      if (user) {
        console.log('User is already logged in');
        navigation.navigate('EggHatchAnimation');
        return;
      }

      // Log in the user with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      // Store the user in AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(loggedInUser));

      // Update the local user state
      setUser(loggedInUser);

      console.log('User logged in successfully');
      navigation.replace("EggHatchAnimation");
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/PartsLog.png')} style={styles.background}>
      <View style={{marginTop: 200}}>
  <Image source={require('../assets/PandaHead.png')} style={{ width: 200, height: 300, resizeMode: 'contain' }} />
</View>

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
       
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry
        style={[styles.input, {marginTop: 30}]}
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
    width: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: 490,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    borderRadius: 50, // Add this property
  },
   
   
 
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    alignContent: 'center',
    marginBottom: 40,
  },
  textContainer:{
    alignContent: 'center',
    alignSelf: 'center',
   


  },
  
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 100,
    alignContent: 'center',
    alignSelf: 'center',
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
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',


  },
  input: {
    width: 300,
   
    backgroundColor: '#C8E6C9', // light green
    borderRadius: 20,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop:90,
    alignSelf: 'center',
    color: 'black',
    position: 'relative',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight:60,
    marginBottom: '20%',
    color: '#013220',

  },
  forgotPasswordText: {
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