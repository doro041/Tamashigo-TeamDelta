import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import Footer from '../components/Footer';

const timer = () => {

    return (
        {}
    )
}

const skip = () => {
    return (
        {}
    )
}

const ShortBreak = ({ navigation }) => {
    return (

        <View style={styles.container}>

            <ImageBackground style={styles.background}>

                <View style={styles.buttonContainer}>
                    <Image
                        style={styles.shortBreak}
                        source={require('../assets/shortBreak.svg')}
                    />
                    <Text key={"textTime"} adjustsFontSizeToFit={true} style={styles.time}>00:00:10</Text>
                    <Image
                        style={styles.panda}
                        source={require('../assets/pandaLvl3.svg')}
                    />
                    <View style={styles.pomodoroButton}>
                        <Pressable onPress={timer()} style={styles.resumePress}>
                            <Image
                                style={styles.resumeLogo}
                                source={require('../assets/pomodoroResume.svg')}
                            />
                        </Pressable>
                        <Pressable onPress={skip()} style={styles.skipPress}>
                            <Image
                                style={styles.skipLogo}
                                source={require('../assets/skipButton.svg')}
                            />
                        </Pressable>
                    </View>
                    <Footer></Footer>
                </View>

            </ImageBackground>

        </View>
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
        backgroundColor: '#7CCE7C',
        width: '100%',
        height: '100%',
    },

    buttonContainer: {
        flex: 1,
    },

    shortBreak: {
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

    pomodoroButton: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        height: '100%',
    },

    resumePress: {
        flex: 0.5,
    },

    resumeLogo: {
        flex: 0.5,
        resizeMode: 'center',
    },

    skipPress: {
        flex: 0.5,
    },

    skipLogo: {
        flex: 0.5,
        resizeMode: 'center',
    },


});

export default ShortBreak;