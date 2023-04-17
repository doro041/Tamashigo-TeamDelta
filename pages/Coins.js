import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Attributes from './Attributes';	

const Coins = ({ taskItems = [], setTaskItems,  setCompletedTask, productivityCoins, setProductivityCoins, healthCoins, setHealthCoins, financeCoins, setFinanceCoins, hobbyCoins, setHobbyCoins}) => {



  const completedTask = (index, category, priority, timePassedPercent) => {
    // Increment the appropriate coin based on the category of the completed task
    let coinIncrement = 0;
    console.log('TEST111');
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
        console.log('high');
        break;
      case 'ASAP':
        coinIncrement = 8;
        console.log('asap');
        break;
      default:
        break;
    }
    
    // Multiply coinIncrement based on timePassedPercent
    if (timePassedPercent >=0 && timePassedPercent <=0.2) {
      console.log('timePassedPercent')
      coinIncrement *=5;
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
        console.log('Productivity Coins')
        setProductivityCoins((prevProductivityCoins) => prevProductivityCoins + coinIncrement);
        break;
      case 'Health':
        console.log('Health Coins')
        setHealthCoins((prevHealthCoins) => prevHealthCoins + coinIncrement);
        break;
      case 'Finances':
        console.log('Finance Coins')
        setFinanceCoins((prevFinanceCoins) => prevFinanceCoins + coinIncrement);
        break;
      case 'Hobbies':
        console.log('Hobby Coins')
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
        
        if (parsedCoins.hasOwnProperty('productivityCoins')) {
          console.log('parsedCoins.productivityCoins')
          setProductivityCoins(parsedCoins.productivityCoins);
        }
        if (parsedCoins.hasOwnProperty('healthCoins')) {
          console.log('parsedCoins.healthCoins')
          setHealthCoins(parsedCoins.healthCoins);
        }
        if (parsedCoins.hasOwnProperty('financeCoins')) {
          console.log('parsedCoins.financeCoins')
          setFinanceCoins(parsedCoins.financeCoins);
        }
        if (parsedCoins.hasOwnProperty('hobbyCoins')) {
          console.log('parsedCoins.hobbyCoins')
          setHobbyCoins(parsedCoins.hobbyCoins);
        }
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