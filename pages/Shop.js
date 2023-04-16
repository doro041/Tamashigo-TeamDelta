import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const Shop = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [taskItems, setTaskItems] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [numDays, setNumDays] = useState(7);
  const [itemLocation, setItemLocation] = useState({});


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
    {id: 1, name: 'EyeMask', price: 30, image: require('../assets/EyeMask.png'), width: 100, height: 80},
    {id: 2, name: 'Halo', price: 30, image: require('../assets/Halo.png'), width: 100, height: 100},
    {id: 3, name: 'DevilEars', price: 30, image: require('../assets/DevilEars.png'), width: 100, height: 100},
    {id: 4, name: 'CowboyHat', price: 50, image: require('../assets/CowboyHat.png'), width: 100, height: 100},
    {id: 5, name: 'baguette', price: 50, image: require('../assets/baguette.png'), width: 70, height: 75},
    {id: 6, name: 'hat', price: 50, image: require('../assets/hat.png'), width: 80, height: 60},
    {id: 7, name: 'beret', price: 80, image: require('../assets/beret.png'), width: 100, height: 65},    
    {id: 8, name: 'slime', price: 80, image: require('../assets/slime.png'), width: 90, height: 60},
    {id: 9, name: 'sunglasses', price: 80, image: require('../assets/sunglasses.png'), width: 100, height: 42},
      
  ];

  const handlePress = (item) => {
    setSelectedItem(item);

    // Determine the location of the item on the mascot image based on its name
    let location = {};
    switch (item.name) {
      case 'EyeMask':
        location = { top: -30, left: 114, width: 150, height: 150 };
        break;
      case 'Halo':
        location = { top: -100, left: 122, width: 150, height: 150 };
        break;
      case 'DevilEars':
        location = { top: -70, left: 108, width: 150, height: 150 };
        break;
      case 'CowboyHat':
        location = { top: -110, left: 110, width: 150, height: 150 };
        break;
      case 'baguette':
        location = { top: -80, left: 150, width: 150, height: 150 };
        break;
      case 'hat':
        location = { top: -120, left: 105, width: 150, height: 100 }
        break;
      case 'beret':
        location = { top: -85, left: 40, width: 150, height: 150};
        break;
      case 'slime':
        location = { top: -100, left: 120, width: 120, height: 80 };
        break;
      case 'sunglasses':
        location = { top: 10, left: 108, width: 150};
        break;
      default:
        break;
    }
    setItemLocation(location);

  };

  const handleBuy = async () => {
    try {
      await AsyncStorage.setItem("selectedShopItem", JSON.stringify(selectedItem));
    } catch (error) {
      console.error("Error saving selected shop item:", error);
    }
  };
  

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Shop</Text>
    <View style={styles.mascotContainer}>
      <Image style={styles.mascot} source={require('../assets/Panda.png')} />
      {selectedItem && (
        <Image
          style={[styles.itemImage, itemLocation]}
          source={selectedItem.image}
        />
      )}
    </View>
      <ScrollView>
        <View style={styles.itemsContainer}>
          {items.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.item, selectedItem === item && styles.selectedItem]} onPress={() => handlePress(item)}>
              <Image style={[styles.itemImage, {width: item.width, height: item.height}]} source={item.image} />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} coins</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy} disabled={!selectedItem}>
          <Text style={styles.buyButtonText}>Buy {selectedItem?.name} for {selectedItem?.price} coins</Text>
        </TouchableOpacity>
        <View style={styles.selectedItemContainer}>
          {selectedItem &&
            <Text style={styles.selectedItemText}>You selected: {selectedItem.name}</Text>
          }
        </View>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Footer
          taskItems={taskItems}
          deadlines={deadlines}
          valueList={valueList}
          categoriesList={categoriesList}
        />
      </View>
    </View>
  );};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: '#94bfa2',
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
    width: '30%',
    height: 150,
    borderRadius: 2,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedItem: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  itemImage: {
    width: 80,
    height: 60,
    position: 'absolute',
    marginTop: 50,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 80,
  },
  itemPrice: {
    fontSize: 16,
    color: 'gray',
  },
  buyButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  
  mascot: {
    width: 250,
    height: 350,
    alignSelf: 'center',
    marginBottom: 16,
  },
  selectedItemContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  selectedItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
  footerContainer: {
    marginTop: 16,
  },
  mascotContainer: {
    position: 'relative',
  }
});

export default Shop;
