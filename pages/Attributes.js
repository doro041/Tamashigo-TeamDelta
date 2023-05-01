import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AttributesProgressBar from './AttributesProgressBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const Attributes = ({
  productivityCoins,
  setProductivityCoins,
  healthCoins,
  setHealthCoins,
  financeCoins,
  setFinanceCoins,
  hobbyCoins,
  setHobbyCoins
}) => {
  const [productivityLevel, setProductivityLevel] = useState(0);
  const [healthLevel, setHealthLevel] = useState(0);
  const [financeLevel, setFinanceLevel] = useState(0);
  const [hobbyLevel, setHobbyLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(1);

  const checkAttributesMaxLevel = () => {
    const attributes = [      { name: 'Productivity', level: productivityLevel },      { name: 'Health', level: healthLevel },      { name: 'Finance', level: financeLevel },      { name: 'Hobby', level: hobbyLevel },    ];

    const allMaxLevel = attributes.every(attr => attr.level === maxLevel);

    if (allMaxLevel) {

      setMaxLevel(prevMaxLevel => {
  const increaseFactor = 1 + (prevMaxLevel / 100); // You can customize this formula
  const newValue = prevMaxLevel * increaseFactor;
  setCurrentLevel(
    prevCurrentLevel => prevCurrentLevel + 1
  );
  Alert.alert('Good job. Level Up!');
  return Math.ceil(newValue / 10) * 10;
});

      console.log(maxLevel,'maxlevel');
      
    }
  };


  console.log('TESTING TESTING productivityLevel', productivityLevel, 'healthLevel', healthLevel, 'financeLevel', financeLevel, 'hobbyLevel', hobbyLevel)



  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  const getData = async (key, setter) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        setter(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log('Error getting data:', error);
    }
  };
  useEffect(() => {
    checkAttributesMaxLevel();
  }, [productivityLevel, healthLevel, financeLevel, hobbyLevel]);
  
  useEffect(() => {
    getData('productivityLevel', setProductivityLevel);
    getData('healthLevel', setHealthLevel);
    getData('financeLevel', setFinanceLevel);
    getData('hobbyLevel', setHobbyLevel);
    getData('maxLevel', setMaxLevel);
    getData('currentLevel', setCurrentLevel);
  }, []);



  

  useEffect(() => {
    storeData('productivityLevel', productivityLevel);
    storeData('healthLevel', healthLevel);
    storeData('financeLevel', financeLevel);
    storeData('hobbyLevel', hobbyLevel);
    storeData('maxLevel', maxLevel);
    console.log("Testing Attribues: ", currentLevel);
    storeData('currentLevel', currentLevel);
  }, [productivityLevel, healthLevel, financeLevel, hobbyLevel, maxLevel, currentLevel]);

  const incrementAttribute = (levelSetter, coinSetter, coins, maxLevel) => {
    if (coins >= 10) {
      levelSetter((prevLevel) => {
        const newLevel = prevLevel + 10;
        if (newLevel <= maxLevel) {
          coinSetter((prevCoins) => prevCoins - 10);
          return newLevel;
        } else {
          return prevLevel;
        }
      });
    }
  };
  

  
  

  return (
    
    <View style={styles.parentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Attributes</Text>
      </View>
      <View style={styles.container}>
        
        <View>
        {[
  {
    label: 'Productivity',
    level: productivityLevel,
    icon: 'briefcase',
    onPress: () =>
      incrementAttribute(
        setProductivityLevel,
        setProductivityCoins,
        productivityCoins,
        maxLevel
      ),
  },
  {
    label: 'Health',
    level: healthLevel,
    icon: 'heartbeat',
    onPress: () =>
      incrementAttribute(
        setHealthLevel,
        setHealthCoins,
        healthCoins,
        maxLevel
      ),
  },
  {
    label: 'Finance',
    level: financeLevel,
    icon: 'dollar',
    onPress: () =>
      incrementAttribute(
        setFinanceLevel,
        setFinanceCoins,
        financeCoins,
        maxLevel
      ),
  },
  {
    label: 'Hobbies',
    level: hobbyLevel,
    icon: 'gamepad',
    onPress: () =>
      incrementAttribute(setHobbyLevel, setHobbyCoins, hobbyCoins, maxLevel),
  },
      ].map(({ label, level, icon, onPress }) => (
        <View key={label} style={styles.attributeContainer}>
          <View style={styles.iconContainer}>
            <Icon name={icon} size={24} color="#555" />
          </View>
        
              
              <View style={styles.progressContainer}>
                <AttributesProgressBar
                  progress={level}
                  level={level}
                  maxLevel={maxLevel}
                  barHeight={20}
                />
              </View>
              <TouchableOpacity style={styles.plusButton} onPress={onPress}>
              <Feather name="plus" size={24} color="#4A8AE7" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  parentContainer:{
    width:'100%',
    height: '100%',
    alignItems:'center',
    borderRadius:30,
    justifyContent:'center',
   
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    marginRight: '3%',
    marginLeft: '5%',
    left: '100%',
   
  },
  progressBar: {
    flexGrow: 1,
    marginRight: 5,
  },
  

  parentContainer: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 30,
   

  },
  header: {
    padding: 5, 
    width: '70%',
    height: '25%',
    backgroundColor: '#000',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20, // Change this line to use a numeric value instead of a percentage
    textAlign: 'center', // This line is already here, and it should center the text horizontally
  },
  

  container: {
    backgroundColor: '#fcfcf2',
    padding: 15,
    width:'100%',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.25,
     shadowRadius: 3.84,
     elevation: 5,
  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: '90%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 0,
    
  },
  label: {
    minWidth: 85,
    textAlign: 'right',
    marginRight: 5,
   
  },
  progressBar: {
    flex: 1,
    marginLeft: 5,
  },
  plusButton: {
    backgroundColor: 'black',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 25,
    height:25,
    left: '900%',
  },
  plusButtonText: {
    fontSize:20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    borderWidth:1,
    borderColor:'#000',
  },
});


export default Attributes;