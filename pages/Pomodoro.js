import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable, ScrollView } from 'react-native';
import Footer from '../components/Footer';
import TaskManagement from '../components/TaskManagement';


const Pomodoro = () => {
    const [currentMinute, setCurrentMinute] = useState(1);
    const [currentSeconds, setCurrentSecond] = useState(0);
    const [start, setStart] = useState(false)

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
                    }
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [currentSeconds, currentMinute, start]);

    var timing = currentMinute + ":" + currentSeconds;

    const startCount = () => {
        if (!start) {
            setStart(true);
        } else {
            setStart(false);
        }
    };

    const [backgroundStyle, setBackgroundStyle] = useState(require('../assets/backgroundShortBreak.svg'));
    const [shortBreakStyle, setShortBreakStyle] = useState(styles.currentOption);
    const [focusStyle, setFocusStyle] = useState(styles.breakIcon);
    const [longBreakStyle, setLongBreakStyle] = useState(styles.breakIcon);
    const focus = () => {
        setStart(false);
        setBackgroundStyle(require('../assets/backgroundFocus.svg'));
        setFocusStyle(styles.currentOption);
        setShortBreakStyle(styles.breakIcon);
        setLongBreakStyle(styles.breakIcon);
        setCurrentMinute(25);
        setCurrentSecond(0);
    }
    const pomodoro = () => {
        setStart(false);
        setBackgroundStyle(require('../assets/backgroundShortBreak.svg'));
        setShortBreakStyle(styles.currentOption);
        setFocusStyle(styles.breakIcon);
        setLongBreakStyle(styles.breakIcon);
        setCurrentMinute(5);
        setCurrentSecond(0);
    }
    const longBreak = () => {
        setStart(false);
        setBackgroundStyle(require('../assets/backgroundLongBreak.svg'));
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
                                source={require('../assets/focus.svg')}
                            />
                        </Pressable>
                        <Pressable style={shortBreakStyle} onPress={pomodoro}>
                            <Image
                                style={styles.breakIcon}
                                source={require('../assets/shortBreak.svg')}
                            />
                        </Pressable>
                        <Pressable style={longBreakStyle} onPress={longBreak}>
                            <Image
                                style={styles.breakIcon}
                                source={require('../assets/longBreak.svg')}
                            />
                        </Pressable>
                    </View>
                    <Text key={"textTime"} adjustsFontSizeToFit={true} style={styles.time}>{timing}</Text>
                    <Image
                        style={styles.panda}
                        source={require('../assets/pandaLvl3.svg')}
                    />
                    <Pressable onPress={() => startCount()} style={styles.resumePress}>
                        <Image
                            style={styles.resumeLogo}
                            source={require('../assets/pomodoroResume.svg')}
                        />
                    </Pressable>
                    <TaskManagement></TaskManagement>
                </View>
                <Footer></Footer>
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
    },

    countdownOption: {
        flex: 0.5,
        flexDirection: 'row',
    },

    currentOption: {
        flex: 0.5,
        marginTop: 25,
        resizeMode: "center",
    },

    breakIcon: {
        flex: 0.5,
        resizeMode: "stretch",
    },

    time: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: '10%',
        width: 300,
        maxHeight: 50,
        textAlign: 'center',
        fontSize: 30,
        margin: 'auto',
    },

    panda: {
        flex: 2,
        resizeMode: 'center',
    },


    resumePress: {
        flex: 1,
    },

    resumeLogo: {
        flex: 0.5,
        resizeMode: 'center',
    },

});

export default Pomodoro;