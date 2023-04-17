import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  async function handleSignUp() {
    try {
      const auth = getAuth();
      const actionCodeSettings = {
        url: 'https://example.com/verify-email',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.myapp',
        },
        android: {
          packageName: 'com.example.myapp',
          installApp: true,
          minimumVersion: '12',
        },
        dynamicLinkDomain: 'example.com',
      };
 
  
      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForSignIn", email);
          // Redirect the user to a page that says "Check your email to sign in"
          navigation.navigate('Namechar');
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/icon12.png')} style={styles.background} resizeMode='cover'>
      <Image source={require('../assets/PandaHead.png')} style={{ width: windowWidth * 0.5, height: windowHeight * 0.3, resizeMode: 'contain' }} />
<Text style={[styles.title, { marginTop: '50%' }]}>Create account</Text>

      </ImageBackground>
      <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
    
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
    
      <View style={styles.buttonContainer}>
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={[styles.button, { marginRight: windowWidth * 0.02 }]} onPress={() => navigation.navigate('Home') }>
    <Text style={styles.buttonText}>SIGN UP</Text>
  </TouchableOpacity>

  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: windowWidth * 0.05, height: windowWidth * 0.05 }]}>
    <Icon name="facebook" size={windowWidth * 0.5} color="white" style={styles.icon} />
  </TouchableOpacity>

  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: windowWidth * 0.05, height: windowWidth * 0.05 }]}>
    <Icon name="google" size={windowWidth * 0.5} color="white" style={styles.icon} />
  </TouchableOpacity>
</View>

      </View>

      <TouchableOpacity style={styles.alreadyacc} onPress={() => navigation.navigate('Login')}>
        <Text>Already have an account?</Text><Text style={styles.SignInText}>Sign In.</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  
  title: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: windowHeight * 0.05,
    marginTop: windowHeight * 0.05,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginBottom: windowHeight * 0.1,
  },
  //  d
  button: {
    width: windowWidth * 0.3,
    borderRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.05,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: windowHeight * 0.05,
    borderRadius: 25,
    backgroundColor: 'grey',
    paddingLeft: 20,
    marginBottom: windowHeight * 0.01,
  marginTop: windowHeight * 0.30, // adjust this value as needed
  },

  alreadyacc: {
    marginTop: windowHeight * 0.1,
    marginBottom: windowHeight * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignInText: {
    color: 'black',
    fontWeight: 'bold',
  },  
  icon: {
    padding: windowWidth * 0.01,
  },
});

export default SignUp;