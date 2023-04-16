import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Coins = ({ taskItems = [], setTaskItems, setCompletedTask }) => {
  const [productivityCoins, setProductivityCoins] = useState(0);
  const [healthCoins, setHealthCoins] = useState(0);
  const [financeCoins, setFinanceCoins] = useState(0);
  const [hobbyCoins, setHobbyCoins] = useState(0);

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

  const deleteTask = (index, category) => {
    // Increment the appropriate coin based on the category of the completed task
  switch (category) {
    case 'Productivity':
      setProductivityCoins((prevProductivityCoins) => prevProductivityCoins + 1);
      break;
    case 'Health':
      setHealthCoins((prevHealthCoins) => prevHealthCoins + 1);
      break;
    case 'Finances':
      setFinanceCoins((prevFinanceCoins) => prevFinanceCoins + 1);
      break;
    case 'Hobbies':
      setHobbyCoins((prevHobbyCoins) => prevHobbyCoins + 1);
      break;
    default:
      break;
  }

  let itemsCopy = [...taskItems];
  itemsCopy.splice(index, 1);
  setTaskItems(itemsCopy);
};

useEffect(() => {
  setCompletedTask(() => deleteTask);
}, []);

  return (
    <Text>
      Productivity Coins: {productivityCoins} | Health Coins: {healthCoins} | Finance Coins: {financeCoins} | Hobby Coins: {hobbyCoins}
    </Text>
  );
};

export default Coins;