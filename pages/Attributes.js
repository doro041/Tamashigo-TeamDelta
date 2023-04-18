import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const incrementAttribute = (levelSetter, coinSetter, coins, currentLevel) => {
    if (coins > 0) {
      const newLevel = currentLevel + 1;
      levelSetter(newLevel);
      storeAttributeLevels(
        newLevel === productivityLevel + 1 ? newLevel : productivityLevel,
        newLevel === healthLevel + 1 ? newLevel : healthLevel,
        newLevel === financeLevel + 1 ? newLevel : financeLevel,
        newLevel === hobbyLevel + 1 ? newLevel : hobbyLevel
      );
      coinSetter((prev) => prev - 1);
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
   
    <View>
      <View>
      
        <Text>Productivity: {productivityLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() =>
          
            incrementAttribute(setProductivityLevel, setProductivityCoins, productivityCoins, productivityLevel)
            
          }
        >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Health: {healthLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => 
            incrementAttribute(setHealthLevel, setHealthCoins, healthCoins, healthLevel)}
            >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Finances: {financeLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => incrementAttribute(setFinanceLevel, setFinanceCoins, financeCoins)}
        >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Hobbies: {hobbyLevel}</Text>
        <TouchableOpacity
          style={buttonStyle}
          onPress={() => incrementAttribute(setHobbyLevel, setHobbyCoins, hobbyCoins, hobbyLevel)}
          >
          <View>
            <Text style={{ color: 'white' }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attributes;