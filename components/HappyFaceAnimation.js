import { React, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Text } from 'react-native';

function HappyFaceAnimation({ isMounted }) {
    const fadeOutAnim = useRef(new Animated.Value(1)).current;
    const fadeOutBisAnim = useRef(new Animated.Value(1)).current;
    const fadeInAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeInAnim, {
            toValue: 1,
            delay: 900,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    const interpolateFadeIn = fadeInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0', '100'],
    });

    const fadeOut = () => {
        Animated.timing(fadeOutAnim, {
            toValue: 0,
            delay: 1000,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    };
    const interpolateFadeOut = fadeOutAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-100', '100'],
    });
    const interpolateText = fadeOutAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });
    const interpolateRotate = fadeOutAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['10deg', '0deg'],
    });

    const fadeOutBis = () => {
        Animated.timing(fadeOutBisAnim, {
            toValue: 0,
            delay: 1500,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };
    const interpolateFadeOutBis = fadeOutBisAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0', '100'],
    });

    const interpolateTextFade = fadeOutBisAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0', '100'],
    });

    useEffect(() => {
        if (isMounted) {
            fadeIn();
            fadeOut();
            fadeOutBis();
        }
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.text, { flex: 1, opacity: interpolateTextFade, transform: [{ translateY: interpolateText }] }]} >
                <Text style={{ flex: 1, }}>Task<br />Completed!</Text>
            </Animated.View>
            <Animated.View style={{ flex: 1, transform: [{ rotate: interpolateRotate }], opacity: interpolateFadeIn }}>
                <Animated.View style={[styles.surprisedFace, { opacity: interpolateFadeOut, }]}>
                    <Image source={require('../assets/HappyFace.png')} style={[styles.image,]}></Image>
                </Animated.View>
                <Animated.View style={[styles.happyFace, { opacity: interpolateFadeOutBis, }]}>
                    <Image source={require('../assets/SurprisedFace.png')} style={[styles.image,]}></Image>
                </Animated.View>

            </Animated.View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    image: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'center',
    },

    happyFace: {
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 1,
        position: 'absolute',
    },

    surprisedFace: {
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 2,
        position: 'absolute',
    },

    text: {
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 3,
        position: 'absolute',
        marginLeft: '67%',
        marginTop: '20%',
    },
});

export default HappyFaceAnimation;