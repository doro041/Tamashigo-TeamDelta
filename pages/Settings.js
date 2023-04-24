import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import AttributePage from './AttributePage';


const Settings = ({navigation}) => {
    const [taskItems, setTaskItems] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        loadData();
      }, []);

    const loadData = async () => {
        try {
          const storedTaskItems = await AsyncStorage.getItem("taskItems");
          const storedValueList = await AsyncStorage.getItem("valueList");
          const storedCategoriesList = await AsyncStorage.getItem("categoriesList");
          const storedDeadlines = await AsyncStorage.getItem("deadlines");
      
          let parsedTaskItems = [];
          let parsedValueList = [];
          let parsedCategoriesList = [];
          let parsedDeadlines = [];
      
          if (storedTaskItems) {
            parsedTaskItems = JSON.parse(storedTaskItems);
          }
      
          if (storedValueList) {
            parsedValueList = JSON.parse(storedValueList);
          } else {
            console.warn('No value list found');}
      
          if (storedCategoriesList) {
            parsedCategoriesList = JSON.parse(storedCategoriesList);
          }
      
          if (storedDeadlines) {
            parsedDeadlines = JSON.parse(storedDeadlines).map(dateString => new Date(dateString));
          }
          console.log('Loaded data:', parsedTaskItems, parsedValueList, parsedCategoriesList, parsedDeadlines)
          setDeadlines(parsedDeadlines);
          setTaskItems(parsedTaskItems);
          setValueList(parsedValueList);
          setCategoriesList(parsedCategoriesList);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <TouchableOpacity style={styles.settingRow}
      onPress={() => navigation.navigate('AttributePage')}>
        <Text style={styles.settingText}>Attributes</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>

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

      <TouchableOpacity  style={styles.settingRow}
              onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.settingText}>Profile</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingRow}
        onPress={() => navigation.navigate('About')}>
        <Text style={styles.settingText}>About</Text>
        <Feather name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
      <Footer
      
       taskItems={taskItems}
       deadlines={deadlines}
       valueList={valueList}
       categoriesList={categoriesList}
      />
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
