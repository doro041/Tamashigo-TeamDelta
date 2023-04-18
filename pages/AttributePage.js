import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Attributes from './Attributes';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import Coins from './Coins';

const AttributePage = ({ route }) => {
    const [taskItems, setTaskItems] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
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
  const navigation = useNavigation();
  const [startTimes, setStartTimes] = useState([]);
  const [productivityCoins, setProductivityCoins] = useState(0);
  const [healthCoins, setHealthCoins] = useState(0);
  const [financeCoins, setFinanceCoins] = useState(0);
  const [hobbyCoins, setHobbyCoins] = useState(0);
  //const { productivityCoins, healthCoins, financeCoins, hobbyCoins } = route.params;
  console.log('Loaded coins in AttributePage.js:', productivityCoins, healthCoins, financeCoins, hobbyCoins)
  return (
    <View style={styles.container}>
       <Coins
  taskItems={taskItems}
  setTaskItems={setTaskItems}
  setCompletedTask={setCompletedTask}
  productivityCoins={productivityCoins}
  setProductivityCoins={setProductivityCoins}
  healthCoins={healthCoins}
  setHealthCoins={setHealthCoins}
  financeCoins={financeCoins}
  setFinanceCoins={setFinanceCoins}
  hobbyCoins={hobbyCoins}
  setHobbyCoins={setHobbyCoins}
/>
      <Attributes
        productivityCoins={productivityCoins}
        healthCoins={healthCoins}
        financeCoins={financeCoins}
        hobbyCoins={hobbyCoins}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
});

export default AttributePage;