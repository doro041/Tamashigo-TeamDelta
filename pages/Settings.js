import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';



const Settings = ({navigation}) => {



  //styling for the settings page 
  


  return (

    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Change Theme</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Notifications</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Backup & Restore</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Privacy Policy</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingText}>Terms of Service</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.settingText}>About</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <Footer/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Settings;
