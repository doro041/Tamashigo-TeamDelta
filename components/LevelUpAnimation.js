import { React, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Easing } from 'react-native';

function LevelUpAnimation({ isMounted }) {
    const fadeInAnim = useRef(new Animated.Value(0)).current;
    const flashAnim = useRef(new Animated.Value(1)).current;
    const fadeOutAnim = useRef(new Animated.Value(1)).current;
    const posAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeInAnim, {
            toValue: 1,
            useNativeDriver: true,
            delay: 3500,
        }).start();
    };
    const interpolateFadeIn = fadeInAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0', '100'],
    });

    const flashing = () => {
        Animated.loop(
            Animated.sequence([
                Animated.spring(flashAnim, { toValue: 1, duration: 2500, delay: 0, useNativeDriver: true }),
                Animated.spring(flashAnim, { toValue: -1, duration: 2500, delay: 0, useNativeDriver: true }),
                Animated.spring(flashAnim, { toValue: 0, duration: 2500, delay: 0, useNativeDriver: true }),
            ]),
            { iterations: 4, }
        ).start();
    }
    const interpolateFlash = flashAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['0', '100'],
    });

    const fadeOut = () => {
        Animated.timing(fadeOutAnim, {
            toValue: 0,
            useNativeDriver: true,
            delay: 3500,
        }).start();
    };
    const interpolateFadeOut = fadeOutAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0', '100'],
    });

    const flashingBigPanda = () => {
        Animated.loop(
            Animated.sequence([
                Animated.spring(flashAnim, { toValue: 1, duration: 2000, delay: 0, useNativeDriver: true }),
                Animated.spring(flashAnim, { toValue: -1, duration: 2000, delay: 0, useNativeDriver: true }),
                Animated.spring(flashAnim, { toValue: 0, duration: 2000, delay: 0, useNativeDriver: true }),
            ]),
            { iterations: 3, delay: 2750, }
        ).start();
    }
    const interpolateFlashBigPanda = flashAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['0', '100'],
    });

    const posPanda = () => {
        Animated.sequence([
            Animated.timing(posAnim, { toValue: 1, duration: 100, delay: 5000, easing: Easing.bounce, useNativeDriver: true }),
            Animated.timing(posAnim, { toValue: 0, duration: 500, delay: 100, easing: Easing.bounce, useNativeDriver: true }),
        ]).start();
    };
    const interpolatePos = posAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '-15%'],
    });

    useEffect(() => {
        if (isMounted) {
            flashing();
            fadeIn();
            fadeOut();
            flashingBigPanda();
            posPanda();
        }
    }, []);
    return (

        <View style={styles.container}>
            <Animated.View style={{ flex: 1, }}>
                <Animated.View style={[{ flex: 1, opacity: interpolateFadeOut }, styles.panda]}>
                    <Animated.View style={[{ flex: 1, opacity: interpolateFlash },]}>
                        <Image source={require('../assets/Panda.png')} style={[styles.image]} />
                    </Animated.View>
                </Animated.View>

                <Animated.View style={[{ flex: 1, opacity: interpolateFadeIn, }, styles.pandaLvl2,]}>
                    <Animated.View style={[{ flex: 1, opacity: interpolateFlashBigPanda, transform: [{ translateY: interpolatePos }] },]}>
                        <Image source={require('../assets/pandaLvl2.png')} style={[styles.image]} />
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    image: {
        flex: 1,
        height: '100%',
        width: '100%',
        resizeMode: 'center',
    },
    panda: {
        height: '90%',
        width: '100%',
        zIndex: 2,
        position: 'absolute',
        marginTop: '20%',
    },
    pandaLvl2: {
        height: '100%',
        width: '100%',
        zIndex: 1,
        position: 'absolute',
    },
});

export default LevelUpAnimation;