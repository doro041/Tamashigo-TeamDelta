import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Image,ImageBackground } from 'react-native';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
const ForgotPass = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const auth = getAuth();
  const handleResetPassword = async () => {
    try {
      // Use Firebase Authentication to send a password reset email
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {resetSent ? (
        <View style={styles.content}>
         
          <Text style={styles.text}>A password reset email has been sent to {email}.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Go Back to Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.background}>
          <ImageBackground source={require('../assets/Part.png')} style={styles.background}>
            <Image source={require('../assets/PandaHead.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
            <Text style={styles.title}>Forgot Password</Text>
          </ImageBackground>
      
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>Enter your email address below and we will send you a link to reset your password.</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
    ,
    maxWidth: 400,

  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 400,
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
  button: {
    width: '30%',
    borderRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',

    alignSelf:'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ForgotPass;