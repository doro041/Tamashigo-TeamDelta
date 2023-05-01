import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image  } from 'react-native';
import { firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Coins = ({ taskItems = [], setTaskItems, setCompletedTask, productivityCoins, setProductivityCoins, healthCoins, setHealthCoins, financeCoins, setFinanceCoins, hobbyCoins, setHobbyCoins, saveCoins }) => {
  console.log('Before completedTask')
  const completedTask = async (index, category, priority, timePassedPercent) => {
    
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

useEffect(() => {
  setCompletedTask(() => completedTask);
}, []);

useEffect(() => {
  (async () => {
    if (!productivityCoins && !healthCoins && !financeCoins && !hobbyCoins)
      return
  
    console.log("Saving coins.")
  
    try {
      // TODO: the variables to be saved are always 0?
      const auth = getAuth()
      const ref = doc(firestore, 'coins', auth.currentUser.uid)
      await setDoc(ref, {
        productivityCoins,
        healthCoins,
        financeCoins,
        hobbyCoins,
      })
    } catch (error) {
      console.error('Failed to save coins to storage:', error);
    }
  })()
}, [productivityCoins, healthCoins, financeCoins, hobbyCoins])

return (
  <View style={styles.column}>
    <View style={styles.outerContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Wallet</Text>
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.container}>
        <View style={styles.rowText}>
          <Image source={require('../assets/CoinProd.png')} />
          <Text style={styles.coinText}>{productivityCoins}</Text>
        </View>
        <View style={styles.rowText}>
          <Image source={require('../assets/CoinHealth.png')} />
          <Text style={styles.coinText}>{healthCoins}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.rowText}>
          <Image source={require('../assets/CoinFinance(1).png')} />
          <Text style={styles.coinText}>{financeCoins}</Text>
        </View>
        <View style={styles.rowText}>
          <Image source={require('../assets/CoinHobbies.png')} />
          <Text style={styles.coinText}>{hobbyCoins}</Text>
        </View>
      </View>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
outerContainer: {
  flexDirection: 'row',
  paddingVertical: 5,
  paddingHorizontal:10,
  alignItems: 'center',
  width: '60%',
  height: '20%',
  backgroundColor: 'rgba(0, 0, 0, 1)',
  position: 'absolute',
  top: 20,
  zIndex: 1,
  borderRadius: 20
},
titleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center', // Add this line
  flex: 1, // Add this line
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
   padding: 5,
  width: '50%',
},
column: {
  flexDirection: 'column',
  paddingTop: '10%',
  alignItems: 'center',
},
row: {
  flexDirection: 'row',
  width: '100%',
  padding: 50
  
},
rowText: {
  width: '100%',
  top: 10
},
walletIcon: {
  width: 30,
  height: 50,
},
coinText: {
  textAlign: 'right',
  top: -27
}
});

export default Coins;