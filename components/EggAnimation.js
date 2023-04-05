import { React, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';

const EggAnimation = ({ isMounted }) => {
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const openAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeOutAnim = useRef(new Animated.Value(1)).current;

    const shaking = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 1, duration: 100, delay: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -1, duration: 100, delay: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
            ]),
            { iterations: 6, }
        ).start();
    }
    const interpolateRotation = shakeAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-10deg', '10deg'],
    });

    const opening = () => {
        Animated.timing(openAnim, {
            toValue: 1,
            duration: 3000,
            delay: 5000,
            useNativeDriver: true,
        }).start();
    }
    const interpolateOpen = openAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-90deg'],
    });
    const interpolateTransTopOpen = openAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '-25%'],
    });
    const interpolateTransBotOpen = openAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '50%'],
    });

    const pandaScaling = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 10000,
            useNativeDriver: true,
        }).start();
    };
    const interpolatePandaScale = scaleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-50%', '125%'],
    });

    const fadeOut = () => {
        Animated.timing(fadeOutAnim, {
            toValue: 0,
            delay: 5000,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };
    const interpolateFadeOut = fadeOutAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0', '150'],
    });

    useEffect(() => {
        if (isMounted) {
            shaking();
            opening();
            fadeOut();
            pandaScaling();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    flex: 1, transform: [{ translateX: shakeAnim }, { rotate: interpolateRotation }]
                }}
            >
                <Animated.View style={{ flex: 1, transform: [{ scale: interpolatePandaScale, }] }}>
                    <Image source={require('../assets/Panda.png')} style={[styles.image, styles.panda,]} />
                </Animated.View>

                <View style={styles.separated}>
                    <Animated.View style={{ flex: 1, opacity: interpolateFadeOut, }}>
                        <Animated.View
                            style={{
                                flex: 1, transform: [{ translateX: interpolateTransTopOpen }]
                            }}>
                            <Animated.View
                                style={{
                                    flex: 1, transform: [{ rotate: interpolateOpen }]
                                }}>
                                <Image source={require('../assets/topEgg.png')} style={[styles.image, styles.topEgg]} />
                            </Animated.View>
                        </Animated.View>
                        <Animated.View
                            style={{
                                flex: 1, transform: [{ translateY: interpolateTransBotOpen }]
                            }}>
                            <Image source={require('../assets/bottomEgg.png')} style={[styles.image, styles.bottomEgg]} />
                        </Animated.View>
                    </Animated.View>
                </View>

            </Animated.View >
        </View >
    );
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
    panda: {
        zIndex: 3,
        position: 'absolute',
    },
    separated: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2,
    },
});

export default EggAnimation;