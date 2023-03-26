import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import Footer from '../components/Footer';

const Pomodoro = () => {
    const [currentMinute, setCurrentMinute] = useState(5);
    const [currentSeconds, setCurrentSecond] = useState(0);
    const [start, setStart] = useState(false);

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

    var timing = currentMinute + ":" + currentSeconds;

    const startCount = () => {
        if (!start) {
            setStart(true);
        } else {
            setStart(false);
        }
    };

    const [backgroundStyle, setBackgroundStyle] = useState(require('../assets/backgroundShortBreak.png'));
    const [shortBreakStyle, setShortBreakStyle] = useState(styles.currentOption);
    const [focusStyle, setFocusStyle] = useState(styles.breakIcon);
    const [longBreakStyle, setLongBreakStyle] = useState(styles.breakIcon);
    const focus = () => {
        setStart(false);
        setBackgroundStyle(require('../assets/backgroundFocus.png'));
        setFocusStyle(styles.currentOption);
        setShortBreakStyle(styles.breakIcon);
        setLongBreakStyle(styles.breakIcon);
        setCurrentMinute(25);
        setCurrentSecond(0);
    }
    const shortBreak = () => {
        setStart(false);
        setBackgroundStyle(require('../assets/backgroundShortBreak.png'));
        setShortBreakStyle(styles.currentOption);
        setFocusStyle(styles.breakIcon);
        setLongBreakStyle(styles.breakIcon);
        setCurrentMinute(5);
        setCurrentSecond(0);
    }
    const longBreak = () => {
        setStart(false);
        setBackgroundStyle(require('../assets/backgroundLongBreak.png'));
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
                                source={require('../assets/focus.png')}
                            />
                        </Pressable>
                        <Pressable style={shortBreakStyle} onPress={shortBreak}>
                            <Image
                                style={styles.breakIcon}
                                source={require('../assets/shortBreak.png')}
                            />
                        </Pressable>
                        <Pressable style={longBreakStyle} onPress={longBreak}>
                            <Image
                                style={styles.breakIcon}
                                source={require('../assets/longBreak.png')}
                            />
                        </Pressable>
                    </View>
                    <Text key={"textTime"} adjustsFontSizeToFit={true} style={styles.time}>{timing}</Text>
                    <Image
                        style={styles.panda}
                        source={require('../assets/pandaLvl3.png')}
                    />
                    <Pressable onPress={() => startCount()} style={styles.resumePress}>
                        <Image
                            style={styles.resumeLogo}
                            source={require('../assets/pomodoroResume.png')}
                        />
                    </Pressable>
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
        resizeMode: "center",
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