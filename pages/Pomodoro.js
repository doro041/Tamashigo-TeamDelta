import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer'
import { Alert } from 'react-native';


const Pomodoro = () => {
// minutes, seconds, and start are all states that are used to keep track of the timer and whether it is running or not


    const [currentMinute, setCurrentMinute] = useState(5);
    const [currentSeconds, setCurrentSecond] = useState(0);
    const [start, setStart] = useState(false);
    const [taskItems, setTaskItems] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [message, setMessage] = useState("");
    
    const showAlert = () => {//this is the alert that pops up when the timer is done
      Alert.alert(
        'Time is up!',
        '',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        { 
          cancelable: false,
          titleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#ff0000',
            textAlign: 'center'
          },
          messageStyle: {
            fontSize: 18,
            fontStyle: 'italic',
            color: '#333',
            textAlign: 'center'
          },
          containerStyle: {
            backgroundColor: '#ffffff',
            borderRadius: 10,
            padding: 20
          }
        }
      );
    };


    
    const startCount = () => {
        setStart(!start);
        if (!start) {
            setPomodoroCount(pomodoroCount + 1);
            
        }
    };
    
    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                setCurrentSecond(currentSeconds - 1);
                if (currentSeconds === 0) {
                    if (currentMinute !== 0) {
                        setCurrentSecond(59);
                        setCurrentMinute(currentMinute - 1);
                    } else {
                        setStart(false);
                        clearInterval(interval);
                        showAlert();
                        setPomodoroCount(pomodoroCount + 1);
                        shortBreak();
                    }
                }
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    }, [currentSeconds, currentMinute, start, pomodoroCount]);
    
    const minuteString = currentMinute.toString().padStart(2, "0");
    const secondString = currentSeconds.toString().padStart(2, "0");

    const timing = `${minuteString}:${secondString}`;
 
    useEffect(() => {
        loadData();
    }, []);
    
      useEffect(() => {// hook for the motivational messages
        const messages = [      "You're doing great! Keep it up!",      "Stay focused and keep working!",      "You got this! Keep pushing forward!",      "Remember why you started. You can do it!",      "Stay determined and keep going!",    ];
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * messages.length);
          setMessage(messages[randomIndex]);
        }, 3000); //  how many seconds is that? 

        return () => clearInterval(interval);
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

      const [backgroundStyle, setBackgroundStyle] = useState(require('../assets/LightGreen.png'));
      const [shortBreakStyle, setShortBreakStyle] = useState(styles.currentOption);
      const [focusStyle, setFocusStyle] = useState(styles.breakIcon);
      const [longBreakStyle, setLongBreakStyle] = useState(styles.breakIcon);
      const focus = () => {//the button for Pomodoro focus
          setStart(false);
          setBackgroundStyle(require('../assets/LightGreen.png'));
          setFocusStyle(styles.currentOption);
          setShortBreakStyle(styles.breakIcon);
          setLongBreakStyle(styles.breakIcon);
          setCurrentMinute(25);
          setCurrentSecond(0);
      }
      const shortBreak = () => { //the button for a short break
          setStart(false);
          setBackgroundStyle(require('../assets/GreenBackground.png'));
          setShortBreakStyle(styles.currentOption);
          setFocusStyle(styles.breakIcon);
          setLongBreakStyle(styles.breakIcon);
          setCurrentMinute(5);
          setCurrentSecond(0);
      }
      const longBreak = () => { //the button for a long break
          setStart(false);
          setBackgroundStyle(require('../assets/BlueBackground.png'));
          setLongBreakStyle(styles.currentOption);
          setShortBreakStyle(styles.breakIcon);
          setFocusStyle(styles.breakIcon);
          setCurrentMinute(15);
          setCurrentSecond(0);
      }
      return (
  
          <View style={styles.container}>
              <ImageBackground style={styles.background} source={backgroundStyle}>
             
                  <View style={styles.buttonContainer}>
                      <View style={styles.countdownOption}>
                         
                          <Pressable style={shortBreakStyle} onPress={shortBreak}>
                              <Image
                                  style={styles.breakIcon}
                                  source={require('../assets/ShortBreak.png')}
                              />
                          </Pressable>
                          <Pressable style={focusStyle} onPress={focus}>
                              <Image
                                  style={styles.breakIcon}
                                  source={require('../assets/Focus.png')}
                              />
                          </Pressable>
                          <Pressable style={longBreakStyle} onPress={longBreak}>
                              <Image
                                  style={styles.breakIcon}
                                  source={require('../assets/LongBreak.png')}
                              />
                          </Pressable>
                      </View>
                      <View style={styles.timeContainer}>
  <Text key={"textTime"} adjustsFontSizeToFit={true} style={styles.time}>{timing}</Text>
</View>

                      <Text style={styles.message}>{message}</Text>
                     

                      <Image
                          style={styles.panda}
                          source={require('../assets/Panda.png')}
                      />
                     
                        <Pressable onPress={startCount}>
      <Image
        style={styles.resumePress}
        source={start ? require('../assets/Go.png') : require('../assets/ButtonGreen.png')}
      />
    </Pressable>
   
                  </View>
                  <Footer
        taskItems={taskItems}
        deadlines={deadlines}
        valueList={valueList}
        categoriesList={categoriesList}
      />
              </ImageBackground >
  
  
          </View >
      );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems:'center',
    },
  
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  
    buttonContainer: {
      flex: 1,
      justifyContent: 'center',
      
      
    },
    countdownOption: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 40,
      borderRadius: 900,

    },
    timeContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 10,
      marginTop: 30,
    },
   
    currentOption: {
      resizeMode: "center",
    },
  
    breakIcon: {
      resizeMode: "stretch",
      width: 100,
      height: 40,

    },
    time: {
      color: 'black',
      fontWeight: 'bold',
      width: 300,
      maxHeight: 50,
      textAlign: 'center',
      fontSize: 30,
      alignSelf: 'center',
      marginTop: 20,
      borderRadius: 90,
      padding:10,
      opacity: 0.8,
    },
  
  
message: {
  padding: 30,
  fontSize: 18,
  fontStyle: "italic",
  color: "#333",
  textAlign: "center",
  marginHorizontal: 20,
},
    panda: {
      width: 200,
      height: 260,
      alignSelf: 'center',
      marginTop: 20
    },
  
    resumePress: {
      alignSelf: 'center',
      marginTop: 50,
    
    },
  
    resumeLogo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
  
  });
  

export default Pomodoro;