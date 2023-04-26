import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import StackNavigator from "./StackNavigator";
import { StatusBar } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from './firebase.js';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user
    const checkAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
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
        AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        AsyncStorage.removeItem('user');
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
    
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;