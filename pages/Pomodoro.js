import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../components/Footer';



const Pomodoro = () => {
    const [currentMinute, setCurrentMinute] = useState(1);
    const [currentSeconds, setCurrentSecond] = useState(0);
    const [start, setStart] = useState(false);
    const [taskItems, setTaskItems] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [valueList, setValueList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                setCurrentSecond(currentSeconds - 1);
                if ((currentSeconds === 0)) {
                    if (currentMinute != 0) {
                        setCurrentSecond(59);
                        setCurrentMinute(currentMinute - 1);
                    } else {
                        setStart(false);
                        clearInterval(interval);
                        alert("Time'up !");
                        shortBreak();
                    }
                }
            }, 1000);
            return () => {
                clearInterval(interval);
            }
        }
    }, [currentSeconds, currentMinute, start]);

    const minuteString = currentMinute.toString().padStart(2, "0");
    const secondString = currentSeconds.toString().padStart(2, "0");
    
    const timing = `${minuteString}:${secondString}`; // timing is now "05:00", "15:00", or "25:00"

    const startCount = () => {
        if (!start) {
            setStart(true);
        } else {
            setStart(false);
        }
    };

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
      const focus = () => {
          setStart(false);
          setBackgroundStyle(require('../assets/LightGreen.png'));
          setFocusStyle(styles.currentOption);
          setShortBreakStyle(styles.breakIcon);
          setLongBreakStyle(styles.breakIcon);
          setCurrentMinute(25);
          setCurrentSecond(0);
      }
      const shortBreak = () => {
          setStart(false);
          setBackgroundStyle(require('../assets/GreenBackground.png'));
          setShortBreakStyle(styles.currentOption);
          setFocusStyle(styles.breakIcon);
          setLongBreakStyle(styles.breakIcon);
          setCurrentMinute(5);
          setCurrentSecond(0);
      }
      const longBreak = () => {
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
                          <Pressable style={focusStyle} onPress={focus}>
                              <Image
                                  style={styles.breakIcon}
                                  source={require('../assets/Focus.png')}
                              />
                          </Pressable>
                          <Pressable style={shortBreakStyle} onPress={shortBreak}>
                              <Image
                                  style={styles.breakIcon}
                                  source={require('../assets/ShortBreak.png')}
                              />
                          </Pressable>
                          <Pressable style={longBreakStyle} onPress={longBreak}>
                              <Image
                                  style={styles.breakIcon}
                                  source={require('../assets/LongBreak.png')}
                              />
                          </Pressable>
                      </View>
                      <Text key={"textTime"} adjustsFontSizeToFit={true} style={styles.time}>{timing}</Text>
                      <Image
                          style={styles.panda}
                          source={require('../assets/Panda.png')}
                      />
                      <Pressable onPress={() => startCount()} style={styles.resumePress}>
                          <Image
                              style={styles.resumeLogo}
                              source={require('../assets/ButtonGreen.png')}
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
      backgroundColor: 'white',
      borderRadius: 10,
      width: 300,
      maxHeight: 50,
      textAlign: 'center',
      fontSize: 30,
      alignSelf: 'center',
      marginTop: 20,
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