import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, ImageBackground, ScrollView } from 'react-native';
import Attributes from './Attributes';
import Footer from '../components/Footer';
import { useNavigation } from '@react-navigation/native';
import Coins from './Coins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const Profile = () => {
    const navigation = useNavigation();

    const [taskItems, setTaskItems] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [completedTask, setCompletedTask] = useState(() => () => {});
    const [productivityCoins, setProductivityCoins] = useState(0);
    const [healthCoins, setHealthCoins] = useState(0);
    const [financeCoins, setFinanceCoins] = useState(0);
    const [hobbyCoins, setHobbyCoins] = useState(0);
    console.log('AttributePage.js: ', productivityCoins, healthCoins, financeCoins, hobbyCoins)
    console.log("TaskItems in Attribute.js: ", taskItems)
    console.log("CompletedTask in Attribute.js: ", completedTask)
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return unsubscribe;
    }, [auth]);
  
    // Function to handle the log out button press
    const handleLogout = async () => {
      try {
        await auth.signOut();
        console.log('Log out successful!');
        setCurrentUser(null);
        // Reset the navigation stack and go to the login screen
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Login' },
            ],
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
  
    // Custom header component with a logout button
    const HeaderComponent = () => {
      return (
        <View style={styles.header}>
          {currentUser && (
            <Button title="Log out" onPress={handleLogout} />
          )}
        </View>
      );
    };
    



  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Loading data in AttributePage.js')
      const auth = getAuth()

      const storedTaskItems = await AsyncStorage.getItem("taskItems");
      const storedValueList = await AsyncStorage.getItem("valueList");
      const storedCategoriesList = await AsyncStorage.getItem("categoriesList");
      const storedDeadlines = await AsyncStorage.getItem("deadlines");
      const loadedCompletedTask = await AsyncStorage.getItem('completedTask');

      const ref = doc(firestore, 'coins', auth.currentUser.uid)
      const loadedCoins = (await getDoc(ref)).data()
      setProductivityCoins(loadedCoins.productivityCoins || 0);
      setHealthCoins(loadedCoins.healthCoins || 0);
      setFinanceCoins(loadedCoins.financeCoins || 0);
      setHobbyCoins(loadedCoins.hobbyCoins|| 0);

      if (loadedCompletedTask !== null) setCompletedTask(JSON.parse(loadedCompletedTask));
      console.log('LoadData in AttributePages: ', productivityCoins, healthCoins, financeCoins, hobbyCoins);

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
   
    <View style={styles.container}>
      
      <View style={styles.content}>

      <HeaderComponent />

        {currentUser ? (
          <View>

            <Text style={styles.text}>Welcome, {currentUser.email}!</Text>
          
          </View>
        ) : (
          <View>
            <Text style={styles.text}>You are not logged in.</Text>
            <Button title="Log in" onPress={() => navigation.navigate('Login')} />
            <ImageBackground source={require('../assets/Profile.png')} style={styles.background}>
            </ImageBackground>
          </View>
        )}
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

<Attributes  productivityCoins={productivityCoins}  
setProductivityCoins={setProductivityCoins}  
healthCoins={healthCoins}  
setHealthCoins={setHealthCoins}  
financeCoins={financeCoins}  
setFinanceCoins={setFinanceCoins}  
hobbyCoins={hobbyCoins}  
setHobbyCoins={setHobbyCoins}/>
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
  background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 12,
  },
  subtitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',

  },
  text: {
    fontSize: 16,
    marginBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    margin: 20,
  

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
 
});





export default Profile;