import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ImageBackground, Image,Button, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, fetchSignInMethodsForEmail, updateProfile } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements';








const SignUp = ({ navigation }) => {

  // Define the state for the name, email, password, confirm password, and error message
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-outline');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const auth = getAuth();
  // Define a function to display the terms and conditions alert



 
  // Define a constant to store the key for the AsyncStorage value
  const TERMS_AND_CONDITIONS_KEY = 'termsAndConditionsAgreed';
  
  // Define a function to check whether the user has agreed to the terms and conditions
  const hasAgreedToTermsAndConditions = async () => {
    try {
      const value = await AsyncStorage.getItem(TERMS_AND_CONDITIONS_KEY);
      return value === 'true';
    } catch (error) {
      console.error('Error reading from AsyncStorage:', error);
      return false;
    }
  };
  
  // Define a function to set the flag indicating that the user has agreed to the terms and conditions
  const setAgreedToTermsAndConditions = async () => {
    try {
      await AsyncStorage.setItem(TERMS_AND_CONDITIONS_KEY, 'true');
    } catch (error) {
      console.error('Error writing to AsyncStorage:', error);
    }
  };
  
  // Define a function to show the terms and conditions alert
  const showTermsAndConditionsAlert = (onAgree, onDisagree) => {
    Alert.alert(
      'Terms and Conditions',
      'By using this app, you agree to the terms and conditions outlined in the app.',
      [
        {
          text: 'I Agree',
          onPress: async () => {
            // Set the flag indicating that the user has agreed to the terms and conditions
            await setAgreedToTermsAndConditions();
            // Call the onAgree callback function
            onAgree();
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => {
            // Call the onDisagree callback function
            onDisagree();
          },
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      }
    );
  };
  
  // Define a function to show the error message
  const showError = () => {
    Alert.alert(
      'Error',
      'You must agree to the terms and conditions to use this app.',
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      }
    );
  };
  
  // Check whether the user has agreed to the terms and conditions
  hasAgreedToTermsAndConditions().then((agreed) => {
    if (agreed) {
      console.log('User has already agreed to terms and conditions.');
      // Add code here to allow access to the app
    } else {
      console.log('User has not yet agreed to terms and conditions.');
      // Call the function to display the terms and conditions alert
      showTermsAndConditionsAlert(
        () => {
          console.log('User agreed to terms and conditions.');
          // Add code here to allow access to the app
        },
        () => {
          console.log('User cancelled the terms and conditions alert.');
          showError();
          // Add code here to restrict access to the app
        }
      );
    }
  });

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
      navigation.replace("EggHatchAnimation");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  
  return (
<ScrollView>
<View
    style={styles.container}
    contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center'}}>      
      
      <ImageBackground source={require('../assets/PartsLog.png')} style={styles.background}>

      
       
        <Image source={require('../assets/PandaHead.png')} style={[styles.pandaImage, { marginTop: 80 }]} />

      </ImageBackground>
        
       

       
      <Text style={styles.title}>Sign Up</Text>

      <View style={{ width: '100%', paddingHorizontal: 20, marginBottom: 20 }}>
  <View style={{ flexDirection: 'column', alignItems: 'stretch', marginBottom: 30 }}>
    <TextInput
      style={{ backgroundColor: '#C8E6C9', borderRadius: 20, fontSize: 18, paddingHorizontal: 20, paddingVertical: 10, color: 'black' }}
      value={name}
      onChangeText={(name) => setName(name)}
      placeholder="Name"
    />
  </View>
  <View style={{ flexDirection: 'column', alignItems: 'stretch', marginBottom:30 }}>
    <TextInput
      style={{ backgroundColor: '#C8E6C9', borderRadius: 20, fontSize: 18, paddingHorizontal: 20, paddingVertical: 10, color: 'black' }}
      value={email}
      onChangeText={(email) => setEmail(email)}
      placeholder="Email"
      keyboardType="email-address"
      autoCapitalize="none"
    />
  </View>
  <View style={{ flexDirection: 'column', alignItems: 'stretch', marginBottom: 30 }}>
    <View style={{ position: 'relative' }}>
      <TextInput
        style={{ backgroundColor: '#C8E6C9', borderRadius: 20, fontSize: 18, paddingHorizontal: 20, paddingVertical: 10, color: 'black' }}
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="Password"
        secureTextEntry={passwordVisibility}
      />
      <MaterialCommunityIcons
        name={rightIcon}
        size={24}
        color="black"
        style={{ position: 'absolute', top: '0%', right: '5%', cursor: 'pointer', padding: 10 }}
        onPress={togglePasswordVisibility}
      />
    </View>
  </View>
  <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
    <View style={{ position: 'relative' }}>
      <TextInput
        style={{ backgroundColor: '#C8E6C9', borderRadius: 20, fontSize: 18, paddingHorizontal: 20, paddingVertical: 10, color: 'black' }}
        value={confirmPassword}
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
        placeholder="Confirm Password"
        secureTextEntry={passwordVisibility}
      />
      <MaterialCommunityIcons
        name={rightIcon}
        size={24}
        color="black"
        style={{ position: 'absolute', top: '0%', right: '5%', cursor: 'pointer', padding: 10 }}
        onPress={togglePasswordVisibility}
      />
    </View>
    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
  </View>
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
        <View style={styles.termsContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CheckBox
              checked={termsAgreed}
              onPress={() => setTermsAgreed(!termsAgreed)}
              color="black"
              uncheckedColor="#777777"
            />
            <TouchableOpacity onPress={() => ('Show terms and conditions')}>
              <Text style={styles.termsText}>I agree to the terms and conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.SignUpText, { marginTop: 4 }]}>Log in.</Text>
      </TouchableOpacity>
    </View>
    </View>
  </ScrollView>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
    width: '100%',
  },

  background: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  pandaImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',

  
  },
  
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  
  
  button: {
    width: '30%',
    borderRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(230, 230, 230)',
    alignSelf:'center',

  },
  
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    padding: 10,
    marginBottom: 10,
    paddingHorizontal: 50,
    marginHorizontal: 30,
    alignSelf: 'center',
    justifyContent: 'space-between',
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
  pandaImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
  
  

  });

export default SignUp;