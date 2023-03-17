import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import Footer from '../components/Footer';


const skip = () => {
    return (
        {}
    )
}

const ShortBreak = ({ navigation }) => {
    const [currentMinute, setCurrentMinute] = useState(5);
    const [currentSeconds, setCurrentSecond] = useState(0);
    var timing = currentMinute + ":" + currentSeconds;

    const countdown = () => {
        setCurrentSecond(59);
        setCurrentMinute(currentMinute => currentMinute - 1);
        setInterval(() => {
            setCurrentSecond(currentSeconds => currentSeconds - 1);
            if (currentSeconds == 0) {
                if (currentMinute != 0) {
                    setCurrentSecond(59);
                    setCurrentMinute(currentMinute => currentMinute - 1);
                }
                else {
                    clearInterval()
                }
            }
        }, 1000);
        return (
            <Text>Time's up!</Text>
        )
    }
    const [backgroundStyle, setBackgroundStyle] = useState(require('../assets/backgroundShortBreak.svg'));
    const [resumeStyle, setResumeStyle] = useState();
    const focus = () => {
        setBackgroundStyle(require('../assets/backgroundFocus.svg'));
        setCurrentMinute(25);
        setCurrentSecond(0);
    }
    const shortBreak = () => {
        setBackgroundStyle(require('../assets/backgroundShortBreak.svg'));
        setCurrentMinute(5);
        setCurrentSecond(0);
    }
    const longBreak = () => {
        setBackgroundStyle(require('../assets/backgroundLongBreak.svg'));
        setCurrentMinute(15);
        setCurrentSecond(0);
    }
    return (

        <View style={styles.container}>
            <ImageBackground style={styles.background} source={backgroundStyle}>
                <View style={styles.buttonContainer}>
                    <View style={styles.shortBreak}>
                        <Pressable style={styles.breakIcon} onPress={focus}>
                            <Image
                                style={styles.breakIcon}
                                source={require('../assets/focus.svg')}
                            />
                        </Pressable>
                        <Pressable style={styles.breakIcon} onPress={shortBreak}>
                            <Image
                                style={styles.breakIcon}
                                source={require('../assets/shortBreak.svg')}
                            />
                        </Pressable>
                        <Pressable style={styles.breakIcon} onPress={longBreak}>
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
                    <Pressable onPress={() => countdown()} style={styles.resumePress}>
                        <Image
                            style={styles.resumeLogo}
                            source={require('../assets/pomodoroResume.svg')}
                        />
                    </Pressable>
                    <Footer></Footer>
                </View>

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

    shortBreak: {
        flex: 0.5,
        flexDirection: 'row',
    },

    breakIcon: {
        flex: 0.5,
        resizeMode: 'center',
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

export default ShortBreak;