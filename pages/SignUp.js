import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, fetchSignInMethodsForEmail, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


import  TermsAndConditions from '../components/TermsandConditions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-outline');

  const auth = getAuth();

  const togglePasswordVisibility = () => {
    if (rightIcon === 'eye-outline') {
      setRightIcon('eye-off-outline');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off-outline') {
      setRightIcon('eye-outline');
      setPasswordVisibility(!passwordVisibility);
    }
  };


  async function handleSignUp() {
    try {
      // Check if password matches confirmed password
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
  
      // Check for password length to be at least 6 characters
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters");
        return;
      }
  
      // Check for password to contain uppercase letters
      const uppercaseRegex = /[A-Z]/;
      if (!uppercaseRegex.test(password)) {
        setErrorMessage("Password must contain uppercase letters");
        return;
      }
  
      // Check if email address is valid and not a ProtonMail or ProtonMail Bridge domain
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.(?!protonmail\.com|protonmail\.ch|proton\.me)[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage("Invalid email address");
        return;
      }
  
      // Check if email address is already in use
      const emailExists = await fetchSignInMethodsForEmail(auth, email);
      if (emailExists && emailExists.length > 0) {
        setErrorMessage("That email address is already in use");
        return;
      }
  
      // Sign up the user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      // Set the user's display name
      await updateProfile(auth.currentUser, { displayName: name });
      // Save user data to local storage
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(auth.currentUser)
      );
      // Navigate to the Home screen
      navigation.replace("NameChar");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Part.png')} style={styles.background}>

  <Image source={require('../assets/PandaHead.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />


        <Text style={styles.title}>Welcome to Tamashigo</Text>
        <Text style={styles.subtitle}>Sign Up</Text>
      </ImageBackground>


       
    
    <View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(name) => setName(name)}
        placeholder="Name"
      />
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
  secureTextEntry={passwordVisibility}
/>
<MaterialCommunityIcons
    name={rightIcon}
    size={24}
    color="black"
    style={styles.rightsIcon}
    onPress={togglePasswordVisibility}
  />

<TextInput
  style={styles.input}
  value={confirmPassword}
  onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
  placeholder="Confirm Password"
  secureTextEntry={passwordVisibility}
/>
  <MaterialCommunityIcons
    name={rightIcon}
    size={24}
    color="black"
    style={styles.rightIcon}
    onPress={togglePasswordVisibility}
  />


<View style={{  alignItems: 'center' }}>
  {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
</View>

      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.socialMedia}>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 50, height: 50, marginRight: 10 }]}>
    <Icon name="facebook" size={25} color="white" style={styles.icon} />
  </TouchableOpacity>

  <TouchableOpacity style={[styles.button, { backgroundColor: 'green', width: 50, height: 50, marginLeft: 10 }]}>
    <Icon name="google" size={25} color="white" style={styles.icon} />
  </TouchableOpacity>
</View>
      </View>


      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>
  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
    <Text>Already have an account?</Text><Text style={[styles.SignUpText, { marginTop: 4 }]}>Log in.</Text>
  </TouchableOpacity>
</View>


<TermsAndConditions/>
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
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 50,
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
    backgroundColor: '#F5F5F5',

    alignSelf:'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  

  SignUpText: {
    color: 'black',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    justifyContent: 'center',
  },
  rightIcon: {
    position: 'absolute',
    top: '23%',
    right: '15%',
    cursor: 'pointer',
    padding: 10,
  },

  rightsIcon: {
    position: 'absolute',
    top: '16%',
    right: '15%',
    cursor: 'pointer',
    padding: 10,
  },

  });

export default SignUp;