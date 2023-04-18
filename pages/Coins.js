import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Coins = ({ taskItems = [], setTaskItems, setCompletedTask, productivityCoins, setProductivityCoins, healthCoins, setHealthCoins, financeCoins, setFinanceCoins, hobbyCoins, setHobbyCoins }) => {
  console.log('Before completedTask')
  const completedTask = (index, category, priority, timePassedPercent) => {
    // Increment the appropriate coin based on the category of the completed task
    let coinIncrement = 0;
    console.log('After CompletedTask');
    // Calculate coinIncrement based on priority
    switch (priority) {
      case 'Low':
        coinIncrement = 2;
        console.log('low');
        break;
      case 'Medium':
        coinIncrement = 4;
        console.log('med');
        break;
      case 'High':
        coinIncrement = 6;
        break;
      case 'ASAP':
        coinIncrement = 8;
        break;
      default:
        break;
    }
    
    // Multiply coinIncrement based on timePassedPercent
    if (timePassedPercent >=0 && timePassedPercent <=0.2) {
      coinIncrement *=5;
      console.log('TEST',coinIncrement);
    } else if (timePassedPercent >0.2 && timePassedPercent <=0.4) {
      coinIncrement *=4;
    } else if (timePassedPercent >0.4 && timePassedPercent <=0.6) {
      coinIncrement *=3;
    } else if (timePassedPercent >0.6 && timePassedPercent <=0.8) {
      coinIncrement *=2;
    } else if (timePassedPercent >0.8 && timePassedPercent <=1) {
      coinIncrement *=1;}
    else if (timePassedPercent<0) {
      coinIncrement *=0.5;
    }
    
    switch (category) {
      case 'Productivity':
        setProductivityCoins((prevProductivityCoins) => prevProductivityCoins + coinIncrement);
        break;
      case 'Health':
        setHealthCoins((prevHealthCoins) => prevHealthCoins + coinIncrement);
        break;
      case 'Finances':
        setFinanceCoins((prevFinanceCoins) => prevFinanceCoins + coinIncrement);
        break;
      case 'Hobbies':
        setHobbyCoins((prevHobbyCoins) => prevHobbyCoins + coinIncrement);
        break;
      default:
        break;
    }
    
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const saveCoinsToStorage = async () => {
    try {
      const coins = {
        productivityCoins,
        healthCoins,
        financeCoins,
        hobbyCoins,
      };
      await AsyncStorage.setItem('coins', JSON.stringify(coins));
    } catch (error) {
      console.error('Failed to save coins to storage:', error);
    }
  };

  const loadCoinsFromStorage = async () => {
    try {
      const coins = await AsyncStorage.getItem('coins');
      if (coins !== null) {
        const parsedCoins = JSON.parse(coins);
        setProductivityCoins(parsedCoins.productivityCoins);
        setHealthCoins(parsedCoins.healthCoins);
        setFinanceCoins(parsedCoins.financeCoins);
        setHobbyCoins(parsedCoins.hobbyCoins);
      }
    } catch (error) {
      console.error('Failed to load coins from storage:', error);
    }
  };

  useEffect(() => {
    loadCoinsFromStorage();
  }, []);

  useEffect(() => {
    saveCoinsToStorage();
  }, [productivityCoins, healthCoins, financeCoins, hobbyCoins]);

useEffect(() => {
  setCompletedTask(() => completedTask);
}, []);

  return (
    <Text>
      Productivity Coins: {productivityCoins} | Health Coins: {healthCoins} | Finance Coins: {financeCoins} | Hobby Coins: {hobbyCoins}
    </Text>
  );
};

export default Coins;