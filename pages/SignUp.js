import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handleSignUp() {
    try {
      const auth = getAuth();
      const actionCodeSettings = {
        url: 'localhost',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'localhost'
        },
        android: {
          packageName: 'localhost',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'localhost'
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
    <View style={styles.container}>
      <ImageBackground source={require('../assets/PartOfLogo.png')} style={styles.background}>
        <Image source={require('../assets/PandaHead.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
        <Text style={styles.title}>Create account</Text>
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
      <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={() => handleSignUp()}>
  <Text style={styles.buttonText}>SIGN UP</Text>
</TouchableOpacity>

<TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 30, height: 30 }]}>
  <Icon name="facebook" size={25} color="white" style={styles.icon} />
</TouchableOpacity>
<TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 30, height: 30 }]}>
  <Icon name="google" size={25} color="white" style={styles.icon} />
</TouchableOpacity>

  

      </View>
      <TouchableOpacity style={styles.alreadyacc} onPress={() => navigation.navigate('Login')}>
      <Text>Already have an account?</Text><Text style={styles.SignInText}>Sign In.</Text>
      </TouchableOpacity>
      <View>
     
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
    marginBottom: '10%',
   
    marginTop: '10%',
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
  SignInText: {
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: '20%',

  },
  SignInText: {
    color: 'black',
    fontWeight: 'bold',
    },  
  icon: {
    padding: 10,

    },
    background: {
      flex: 1,
      width: '100%',
      height: '60%',
      alignItems: 'center',
    },
   alreadyacc: {
    marginTop: '10%',
    marginBottom: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',


  },
  


});
export default SignUp;