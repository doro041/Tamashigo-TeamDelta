import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather} from 'react-native-vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import LevelUp from '../components/LevelUp';
const Home = ({ route }) => {
  // In the Home screen
  const [level, setLevel] = useState(1);
  const handleLevelUp = () => {
    setLevel(level + 1);
  };
 
  // Initialize the name state with a fallback value
  const [name, setName] = useState('');
  // Update the name state when route.params change
  useEffect(() => {
    if (route.params && route.params.name) {
      setName(route.params.name);
    }
  }, [route.params]);
  const navigation = useNavigation();
  const [taskPrompt, setTaskPrompt] = useState('');
  const taskPrompts = [
    "Don't forget to take a break!",
    "Remember to drink water!",
    "Stretch your legs!",
    "Take a deep breath!",
    "Look away from the screen!",
    "Stand up and walk around!",
    "Do some neck stretches!",
    "Take a quick walk outside!",
    "Close your eyes and rest for a moment!",
    "Give yourself a pat on the back for what you've accomplished so far!",
    "Take a moment to appreciate the progress you've made!",
    "Visualize yourself successfully completing the task at hand!",
    "Treat yourself to a healthy snack!",
    "Think positive thoughts and keep moving forward!",
    "Take a few minutes to meditate and clear your mind!",
    "Ask for help or support if you need it!",
    "Take a power nap to recharge your batteries!",
    "Reward yourself for completing a task!",
    "Smile and find something to be grateful for!",
    "Listen to your favorite music and dance it out!",
    "Take a moment to connect with a loved one or friend!",
    "Remember to practice self-care and prioritize your well-being!",
    "Celebrate your accomplishments, no matter how small they may seem!",
    "Take a break from technology and enjoy the outdoors!",
    "Take a moment to reflect on your goals and progress!",
    "Visualize yourself overcoming any obstacles or challenges!",
    "Practice positive affirmations and self-talk!",
    "Take a break and do something you enjoy!",
    "Stay focused on your goals and keep pushing forward!",
    "Take a deep breath and let go of any stress or tension!",
    "Believe in yourself and your abilities!",
    "Take a moment to appreciate the beauty around you!",
    "Celebrate your uniqueness and individuality!",
    "Take a moment to practice gratitude and thankfulness!",
    "Stay positive and keep a growth mindset!",
    "Take a moment to appreciate and acknowledge your strengths!",
    "Remember to take care of your physical health!",
    "Take a moment to reflect on your personal growth and progress!",
    "Stay organized and prioritize your tasks!",
    "Take a break and do something fun and creative!",
    "Stay motivated and committed to your goals!",
    "Take a moment to appreciate the support and encouragement of others!",
    "Remember to take breaks and avoid burnout!",
    "Stay curious and keep learning new things!",
    "Take a moment to celebrate your successes!",
    "Stay focused on the present moment and enjoy the journey!",
    "Believe that you are capable of achieving great things!",
    "Take a moment to connect with your inner peace and calm!",
    "Stay true to your values and beliefs!",
    "Take a moment to appreciate the power"  
  ];
  
  
  
  const [taskItems, setTaskItems] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemLocation, setItemLocation] = useState({});
  const [pandaImage, setPandaImage] = useState(require('../assets/Panda.png'));
  const [timer, setTimer] = useState(0);
  
  const handlePromptChange = () => {
    const randomIndex = Math.floor(Math.random() * taskPrompts.length);
    setTaskPrompt(taskPrompts[randomIndex]);
  }
   
  useFocusEffect(
    React.useCallback(() => {
      loadData();
      loadSelectedItem();
    }, [])
  );
  useEffect(() => {
    const updateTimer = () => {
      console.log('Timer:', timer)
      if (timer >= 10 && timer < 20) {
        setPandaImage(require('../assets/SadPanda.png'));
      
      } else if (timer >= 20) {
        setPandaImage(require('../assets/SickPanda.png'));
      } else {
        setPandaImage(require('../assets/Panda.png'));
      }
      setTimer((prevTimer) => prevTimer + 1);
    };
  
    const timerInterval = setInterval(updateTimer, 1000);
  
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);
  
  
  const loadSelectedItem = async () => {
    try {
      const storedSelectedItem = await AsyncStorage.getItem("selectedShopItem");
  
      if (storedSelectedItem) {
        const parsedSelectedItem = JSON.parse(storedSelectedItem);
        setSelectedItem(parsedSelectedItem);
  
        // Set itemLocation based on the item name
        let location = {};
        switch (parsedSelectedItem.name) {
          case 'EyeMask':
        location = { top: -280, left: 2, width: 150, height: 150 };
        break;
      case 'Halo':
        location = { top: -350, left: 10, width: 150, height: 150 };
        break;
      case 'DevilEars':
        location = { top: -320, left: 0, width: 150, height: 150 };
        break;
      case 'CowboyHat':
        location = { top: -340, left: 0, width: 150, height: 150 };
        break;
      case 'baguette':
        location = { top: -350, left: 35, width: 100, height: 100 };
        break;
      case 'hat':
        location = { top: -400, left: -4, width: 120, height: 80 }
        break;
      case 'beret':
        location = { top: -350, left: -45, width: 100, height: 100};
        break;
      case 'slime':
        location = { top: -400, left: -2, width: 120, height: 80 };
        break;
      case 'sunglasses':
        location = { top: -335, left: -5, width: 120};
        break;
          default:
            break;
        }
        setItemLocation(location);
      }
    } catch (error) {
      console.error("Error loading selected shop item:", error);
    }
  };
  
  
  
  const resetTimer = () => {
    setTimer(0);
  };
  
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
          console.log('No value list found');}
    
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
          
        <View style={{ marginTop: 60, justifyContent: 'flex-end', height: 100 }}>	
          <Image source={require('../assets/egg.png')} style={{ width: 100, height: '100%', resizeMode: 'contain', alignSelf: 'flex-end' }} />	
          {/* <Text style={{ position: 'absolute', bottom:30, right: 45 }}>  
          <TouchableOpacity onPress={handleLevelUp}>	
        <Text style={{fontSize:20,fontWeight:'bold'}}>{level}</Text>	
      </TouchableOpacity></Text>	 */}
        </View>	
        <View style={{ marginBottom: 10, justifyContent: 'flex-start', height: 100 }}>	
          <Image source={require('../assets/Wallet.png')} style={{ width: 85, height: '100%', resizeMode: 'contain', alignSelf: 'flex-start',position:'absolute', bottom:110,left:0 }} />	
        </View>	
        <View style={styles.character}>	
          <View style={styles.pandaContainer}>	
          {level >=2 ? (	
    <TouchableOpacity onPress={handlePromptChange}>	
      <Image source={require('../assets/bigpanda.png')} style={{ width: 300, height: 450, resizeMode: 'contain' }} />	
    </TouchableOpacity>	
  ) : (	
    <TouchableOpacity onPress={handlePromptChange}>	
            <Image source={pandaImage} style={{ width: 200, height: 300, resizeMode: 'contain' }} />
    </TouchableOpacity>	
  )}	
          </View>	
          {selectedItem && (	
            <Image	
              style={[styles.itemImage, itemLocation]}	
              source={selectedItem.image}	
            />	
          )}	
        </View>	
        <View>	
        
          <TouchableOpacity onPress={() => navigation.navigate('Todo', {resetTimer})}>	
            <View style={styles.button}>	
              <Feather name="plus" size={24} color="#4A8AE7" />	
              {/* <LevelUp></LevelUp>	 */}
            </View>	
          </TouchableOpacity>	
        </View>	
        <View style={styles.balloon}>	
          <Text style={[styles.text, styles.taskPrompts]} numberOfLines={2}>{taskPrompt}</Text>	
          <Text style={styles.text}>Hi, my name is {name}!</Text>	
        </View>	
          
      </View>	
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
    bottom: -150,

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
    },
    pandaContainer: {
      position: 'absolute',
      bottom: 150,
      left: '50%',
      transform: [{ translateX: -100 }], // This will center the image horizontally
    }
  
});

export default Home;