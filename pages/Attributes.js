import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AttributesProgressBar from './AttributesProgressBar';

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
  const [maxLevel, setMaxLevel] = useState(100);


  const checkAttributesMaxLevel = () => {
    const attributes = [      { name: 'Productivity', level: productivityLevel },      { name: 'Health', level: healthLevel },      { name: 'Finance', level: financeLevel },      { name: 'Hobby', level: hobbyLevel },    ];

    const allMaxLevel = attributes.every(attr => attr.level >= maxLevel);

    if (allMaxLevel) {
      setMaxLevel(prevMaxLevel => {
  const increaseFactor = 1 + (prevMaxLevel / 100); // You can customize this formula
  const newValue = prevMaxLevel * increaseFactor;
  return Math.ceil(newValue / 10) * 10;
});

      console.log(maxLevel,'maxlevel');
      Alert.alert('Good job. Level Up!');
    }
  };


  console.log('TESTING TESTING productivityLevel', productivityLevel, 'healthLevel', healthLevel, 'financeLevel', financeLevel, 'hobbyLevel', hobbyLevel)

  useEffect(() => {
    loadAttributeLevels();
  }, []);

  const storeAttributeLevels = async (newProductivityLevel, newHealthLevel, newFinanceLevel, newHobbyLevel) => {
    try {
      await AsyncStorage.setItem('productivityLevel', JSON.stringify(newProductivityLevel));
      await AsyncStorage.setItem('healthLevel', JSON.stringify(newHealthLevel));
      await AsyncStorage.setItem('financeLevel', JSON.stringify(newFinanceLevel));
      await AsyncStorage.setItem('hobbyLevel', JSON.stringify(newHobbyLevel));
    } catch (error) {
      console.error('Error saving attribute levels', error);
    }
  };

  const loadAttributeLevels = async () => {
    try {
      const loadedProductivityLevel = await AsyncStorage.getItem('productivityLevel');
      const loadedHealthLevel = await AsyncStorage.getItem('healthLevel');
      const loadedFinanceLevel = await AsyncStorage.getItem('financeLevel');
      const loadedHobbyLevel = await AsyncStorage.getItem('hobbyLevel');

      if (loadedProductivityLevel !== null) setProductivityLevel(JSON.parse(loadedProductivityLevel));
      if (loadedHealthLevel !== null) setHealthLevel(JSON.parse(loadedHealthLevel));
      if (loadedFinanceLevel !== null) setFinanceLevel(JSON.parse(loadedFinanceLevel));
      if (loadedHobbyLevel !== null) setHobbyLevel(JSON.parse(loadedHobbyLevel));
    } catch (error) {
      console.error('Error loading attribute levels', error);
    }
  };

  const incrementAttribute = (levelSetter, coinSetter, coins, currentLevel, maxLevel, attributeType) => {
    if (coins > 0) {
      const levelIncrement = coins >= 10 && currentLevel < maxLevel ? 10 : 1;
      const newLevel = Math.min(currentLevel + levelIncrement, maxLevel);
      //checkAttributesMaxLevel();
      levelSetter(newLevel);
  
      storeAttributeLevels(
        attributeType === "productivity" ? newLevel : productivityLevel,
        attributeType === "health" ? newLevel : healthLevel,
        attributeType === "finance" ? newLevel : financeLevel,
        attributeType === "hobby" ? newLevel : hobbyLevel
      );
  
      coinSetter((prev) => prev - levelIncrement);
    }
  };
  
  

  const buttonStyle = {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
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
          onPress: () =>
          incrementAttribute(
            setProductivityLevel,
            setProductivityCoins,
            productivityCoins,
            productivityLevel,
            maxLevel,
            "productivity"
          ),
        },
        {
          label: 'Health',
          level: healthLevel,
          onPress: () =>
          incrementAttribute(
            setHealthLevel,
            setHealthCoins,
            healthCoins,
            healthLevel,
            maxLevel,
            "health"
          ),
        },
        {
          label: 'Finances',
          level: financeLevel,
          onPress: () =>
          incrementAttribute(
            setFinanceLevel,
            setFinanceCoins,
            financeCoins,
            financeLevel,
            maxLevel,
            "finance"
          ),
        },
        {
          label: 'Hobbies',
          level: hobbyLevel,
          onPress: () =>
          incrementAttribute(
            setHobbyLevel,
            setHobbyCoins,
            hobbyCoins,
            hobbyLevel,
            maxLevel,
            "hobby"
          ),
        },
      ].map(({ label, level, onPress }) => (
            <View key={label} style={styles.attributeContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}:</Text>
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
                <Text style={styles.plusButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  progressBar: {
    flexGrow: 1,
    marginRight: 5,
  },
  

  parentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'rgba(240, 140, 240, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '100%',
    height:'25%',
    backgroundColor: '#000',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    // fontSize:'45%',

  },
  container: {
    backgroundColor: '#fcfcf2',
    padding: 15,
    width:'100%',
    height: '20%'
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
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
    width: 20,
    height:20,
    marginRight: 110,
  },
  plusButtonText: {
    fontSize:20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});


export default Attributes;