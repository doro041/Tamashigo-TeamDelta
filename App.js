import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect,useState } from 'react';
import StackNavigator from "./StackNavigator";
import { StatusBar } from 'react-native'; // Import the StatusBar component from the react-native package
import {SafeAreaView, StyleSheet, Text,View } from 'react-native';
import { getAuth, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from './firebase.js';




const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved authentication token
    const checkAuth = async () => {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        const auth = getAuth();
        try {
          const userCredential = await signInWithCustomToken(auth, authToken);
          setUser(userCredential.user);
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Listen for authentication state changes
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        AsyncStorage.setItem('authToken', user.refreshToken);
      } else {
        setUser(null);
        AsyncStorage.removeItem('authToken');
      }
    });
    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
return (
    <SafeAreaView style={{flex:1}}>
<NavigationContainer>
<StackNavigator />
</NavigationContainer>
</SafeAreaView>

);
};


export default App;

