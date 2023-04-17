import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather} from 'react-native-vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';



const Home = () => {
  const navigation = useNavigation();
  const [taskPrompt, setTaskPrompt] = useState('');
  const taskPrompts = ["Don't forget to take a break!", "Remember to drink water!", "Stretch your legs!", "Take a deep breath!", "Look away from the screen!", "Stand up and walk around!"];
  const taskPromptFrequency = 5000; // in milliseconds
  const name = "Bo"; // just for demo purpose
  const [taskItems, setTaskItems] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * taskPrompts.length);
      setTaskPrompt(taskPrompts[randomIndex]);
    }, taskPromptFrequency);
    return () => clearInterval(interval);
  }, [taskPrompts, taskPromptFrequency]); // <-- dependencies
  
  useFocusEffect(
    React.useCallback(() => {
      loadData(); }, [])
      ); // <-- empty dependency array
  


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
   








  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={styles.text}>Welcome {name}!</Text>
        
      </Header>
      <View style={styles.container}>
       
        <ImageBackground source={require('../assets/NameChar.png')} style={{ width: '100%', height: '100%' }}>
            <View style={{marginTop:60,justifyContent: 'flex-end'}}>
                <Image source={require('../assets/egg.png')} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                <Text style={{ position: 'absolute', bottom: 0, right: 0 }}>1</Text>
            </View>
            <View style ={{marginBottom:10,justifyContent:'flex-start'}}>
                <Image source={require('../assets/coin.png')} style={{ width: 25, height: 30, resizeMode: 'contain', alignSelf: 'flex-start' }} />
                <Text style={{ position: 'absolute', bottom: 0, right: 0 }}>1</Text>
            </View>
          <View style={styles.character}>
            <Image source={require('../assets/Panda.png')} style={{ width: 200, height: 300, resizeMode: 'contain' }} />
          </View>
          <View>
       
  <TouchableOpacity onPress={() => navigation.navigate('Todo')}>
    <View style={styles.button}> 

    <Feather name="plus" size={24} color="#4A8AE7" />
    </View>
  </TouchableOpacity>
 
</View>

          <View style={styles.balloon}>
          <Text style={styles.text}>{taskPrompt}</Text>
            <Text style={styles.text}>Hi,my name is {name}!</Text>
            
          </View>
        </ImageBackground>
      </View>
      
      <Footer
       taskItems={taskItems}
       deadlines={deadlines}
       valueList={valueList}
       categoriesList={categoriesList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  character: {
    position: 'absolute',
    center: 0,
    bottom:0,
    alignSelf: 'center',
    margin: 30,

  },
  balloon: {
    position: 'absolute',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 10,
    width: 200,
    height: 100,
    bottom: 300,
    left: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
   
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
      alignSelf: 'center',
      
  
    }
  
});

export default Home;
