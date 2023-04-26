import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image  } from 'react-native';
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
        console.log(financeCoins, " in coins.js")
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
  <View style={styles.column}>
    <View style={styles.outerContainer}>
      <View style={styles.titleContainer}>
        <Image source={require('../assets/Panda.png')} style={styles.walletIcon} />
        <Text style={styles.title}>Wallet</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.container}>
        <Text style={styles.rowText}>Productivity Coins: {productivityCoins}</Text>
        <Text style={styles.rowText}>Health Coins: {healthCoins}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.rowText}>Finance Coins: {financeCoins}</Text>
        <Text style={styles.rowText}>Hobby Coins: {hobbyCoins}</Text>
      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
outerContainer: {
  flexDirection: 'row',
  paddingVertical: 5,
  paddingHorizontal: 10,
  alignItems: 'center',
  width: '100%',
  height: '30%',
  backgroundColor: '#000',
  position: 'absolute',
  top: 0,
  zIndex: 1,
},
titleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#fff',
},
container: {
  flexDirection: 'column',
  backgroundColor: '#fcfcf2',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  marginBottom: 30,
  borderWidth: 1,
  padding: 5
},
column: {
  flexDirection: 'column',
  paddingTop: '10%',
},
row: {
  flexDirection: 'row',
  width: '100%',
  padding: 50
  
},
rowText: {
  width: '100%',
},
walletIcon: {
  width: 30,
  height: 50,
  marginRight: 5,
},
});

export default Coins;