import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { firestore } from '../firebase'; // Importing the Firebase Firestore module
import { doc, getDoc } from 'firebase/firestore' // Importing the necessary Firestore functions
import { getAuth } from 'firebase/auth'; // Importing the Firebase authentication module

// Defining the BeginningPage component
const BeginningPage = ({ navigation }) => {

  console.log('BeginningPage'); // Logging a message to the console

  const auth = getAuth() // Getting the authentication object

  // Setting up a listener for authentication state changes
  auth.onAuthStateChanged(async () => {

    // If a user is already logged in
    if (auth.currentUser) {
      console.log("User already logged in, continuing")

      const auth = getAuth() // Getting the authentication object again (unnecessary, as it was already defined above)

      // Getting the user's name from the Firestore database
      const ref = doc(firestore, 'tamashigoNames', auth.currentUser.uid)

      // Navigating to the NameChar screen after a delay
      setTimeout(async () => {
        navigation.navigate('NameChar', { name: await (await getDoc(ref)).get("name") });
      }, 10000); // 10 second delay
    }
  })
  
  // Rendering the component
  return (
    // The main container
    <View style={styles.container}>
 
      <ImageBackground source={require('../assets/Bg.png')} style={styles.background}>
     
        <Image source={require('../assets/logo1.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
        <Text style={styles.title}>Welcome to Tamashigo</Text>
        <Text style={styles.subtitle}>Where productivity meets fun!</Text>

      
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={() => navigation.navigate('Login')}

        >

          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
       
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1, color: 'black',fontSize: 20, fontWeight: 'bold' }]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>SIGN UP</Text>
</TouchableOpacity>
      </View>
    </View>
  );
};

// Exporting the component and styling it using react native stylesheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    marginTop: '10%',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '5%',
    textAlign: 'center',
    color: '#555555',
    fontStyle: 'italic'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: '30%',

  },
  button: {
    width: '40%',
    borderRadius: 50,
  
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',

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
  
});

export default BeginningPage;