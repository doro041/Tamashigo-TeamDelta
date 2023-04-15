import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Shop = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [taskItems, setTaskItems] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [numDays, setNumDays] = useState(7);
  const [isPremium, setIsPremium] = useState(false); // the premium option


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

  const items = [
    { id: 1, name: 'Mascot 1', price: 100, image: require('../assets/Panda.png') }, //Add customisation options here
    { id: 2, name: 'Mascot 2', price: 150, image: require('../assets/egg1.png') },
    { id: 3, name: 'Mascot 3', price: 200, image: require('../assets/egg2.png') },
    {id: 4, name: 'Premium', price: 300, image: require('../assets/egg3.png')}
      
  ];

  const handlePress = (item) => {
    setSelectedItem(item);
  };

  const handleBuy = () => {
    if (selectedItem?.name === 'Premium') { // premium functionality
      setIsPremium(true);
    } else {
      // TODO: Implement purchase logic for other items
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.item, selectedItem === item && styles.selectedItem]} onPress={() => handlePress(item)}>
            <Image style={styles.itemImage} source={item.image} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price} coins</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.buyButton} onPress={handleBuy} disabled={!selectedItem}>
        <Text style={styles.buyButtonText}>Buy {selectedItem?.name} for {selectedItem?.price} coins</Text>
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
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
  },
  selectedItem: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  buyButton: {
    backgroundColor: 'blue',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Shop;
