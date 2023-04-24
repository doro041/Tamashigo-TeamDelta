import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';
import Footer from '../components/Footer';

const Profile = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth]);

  // Function to handle the log out button press
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Log out successful!');
      setCurrentUser(null);
      // Reset the navigation stack and go to the login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Login' },
          ],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Custom header component with a logout button
  const HeaderComponent = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My App</Text>
        {currentUser && (
          <Button title="Log out" onPress={handleLogout} />
        )}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.content}>
        {currentUser ? (
          <View>
            <Text style={styles.text}>Welcome, {currentUser.email}!</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.text}>You are not logged in.</Text>
            <Button title="Log in" onPress={() => navigation.navigate('Login')} />
          </View>
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Profile;