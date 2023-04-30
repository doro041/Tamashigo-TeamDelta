import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Platform } from 'react-native';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';



const items = [
  {id: 1, name: 'EyeMask', Level: 1, image: require('../assets/EyeMask.png'), width: 100, height: 80, isLocked:true},
  {id: 2, name: 'Halo', Level: 2, image: require('../assets/Halo.png'), width: 100, height: 100, isLocked:true},
  {id: 3, name: 'DevilEars', Level: 3, image: require('../assets/DevilEars.png'), width: 100, height: 100, isLocked:true},
  {id: 4, name: 'CowboyHat', Level: 4, image: require('../assets/CowboyHat.png'), width: 100, height: 100, isLocked:true},
  {id: 5, name: 'baguette', Level: 5, image: require('../assets/baguette.png'), width: 70, height: 75, isLocked:true},
  {id: 6, name: 'hat', Level: 6, image: require('../assets/hat.png'), width: 80, height: 60, isLocked:true},
  {id: 7, name: 'beret', Level: 7, image: require('../assets/beret.png'), width: 100, height: 65, isLocked:true},    
  {id: 8, name: 'slime', Level: 8, image: require('../assets/slime.png'), width: 90, height: 60, isLocked:true},
  {id: 9, name: 'sunglasses', Level: 9, image: require('../assets/sunglasses.png'), width: 100, height: 42, isLocked:true},
];

const Shop = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [taskItems, setTaskItems] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [numDays, setNumDays] = useState(7);
  const [itemLocation, setItemLocation] = useState({});
  const [updatedItems, setUpdatedItems] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  console.log("Current Level: ", currentLevel);
  useEffect(() => {
    loadData();
  }, []);


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
    getData('currentLevel', setCurrentLevel);
    console.log("Current Level USEEFFECT: ", currentLevel)
  }, []);

  const loadData = async () => {
    try {
      const storedTaskItems = await AsyncStorage.getItem("taskItems");
      const storedValueList = await AsyncStorage.getItem("valueList");
      const storedCategoriesList = await AsyncStorage.getItem("categoriesList");
      const storedDeadlines = await AsyncStorage.getItem("deadlines");
      const storedCurrentLevel = await AsyncStorage.getItem("currentLevel");
      console.log("THE LEVEL: ", storedCurrentLevel);
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

      console.log('Loaded data:', parsedTaskItems, parsedValueList, parsedCategoriesList, parsedDeadlines, storedCurrentLevel);
      setDeadlines(parsedDeadlines);
      setTaskItems(parsedTaskItems);
      setValueList(parsedValueList);
      setCategoriesList(parsedCategoriesList);
      setCurrentLevel(storedCurrentLevel);

      // Set isLocked property for each item
      const updatedItems = items.map(item => ({
        ...item,
        isLocked: isItemLocked(item, currentLevel),
      }));
      setUpdatedItems(updatedItems);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const isItemLocked = (item, currentLevel) => {
    return item.id > currentLevel;
  };

  useEffect(() => {
    const updatedItems = items.map(item => ({
      ...item,
      isLocked: isItemLocked(item, currentLevel),
    }));
    setUpdatedItems(updatedItems);
  }, [currentLevel]);
  
  

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
          {updatedItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                selectedItem === item && styles.selectedItem,
                item.isLocked && styles.lockedItem,
              ]}
              onPress={() => !item.isLocked && handlePress(item)}
              disabled={item.isLocked}
            >
              <Image
                style={[
                  styles.itemImage,
                  { width: item.width, height: item.height },
                ]}
                source={item.image}
              />
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} coins</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy} disabled={!selectedItem}>
          <Text style={styles.buyButtonText}>
            Put on cosmetic
          </Text>
        </TouchableOpacity>
        <View style={styles.selectedItemContainer}>
          {selectedItem && (
            <Text style={styles.selectedItemText}>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>You selected:</Text> 
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 24 }}>{selectedItem.name}</Text>
          </Text>
          
          )}
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
  );
};  


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
    borderColor: 'green',
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
  },
  lockedItem: {
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden', // this is required for the blur filter to work
    ...Platform.select({
      ios: {
        // apply the blur filter for iOS devices
        backgroundColor: 'lightgrey',
        blurRadius: 5,
        opacity: 0.5,
        zIndex: 1,
        position: 'relative',
      },
      android: {
        // apply the blur filter for Android devices
        backgroundColor: 'lightgrey',
        blurRadius: 5,
        opacity: 0.5,
        zIndex: 1,
        position: 'relative',
      },
    }),
  },
});

export default Shop; 