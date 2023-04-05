import { React, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Text } from 'react-native';

function LevelUpAnimation({ isMounted }) {
    const fadeInAnim = useRef(new Animated.Value(0)).current;
    const flashAnim = useRef(new Animated.Value(1)).current;
    const fadeOutAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        Animated.timing(fadeInAnim, {
            toValue: 1,
            useNativeDriver: true,
            delay: 7000,
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
        ).start(() =>
            Animated.spring(flashAnim, { toValue: -1, delay: 0, useNativeDriver: true }),
        );
    }
    const interpolateFlash = flashAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['0', '100'],
    });


    useEffect(() => {
        if (isMounted) {
            flashing();
            fadeIn();
        }
    }, []);
    return (

        <View style={styles.container}>
            <Animated.View style={{ flex: 1, }}>
                <Animated.View style={[{ flex: 1, opacity: interpolateFlash }, styles.panda,]}>
                    <Image source={require('../assets/Panda.png')} style={[styles.image]} />
                </Animated.View>
                <Animated.View style={[{ flex: 1, opacity: interpolateFadeIn, }, styles.pandaLvl2,]}>
                    <Image source={require('../assets/pandaLvl2.png')} style={[styles.image,]} />
                </Animated.View>
            </Animated.View>
        </View>
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
        height: '90%',
        width: '100%',
        zIndex: 2,
        position: 'absolute',
    },
    pandaLvl2: {
        height: '100%',
        width: '100%',
        zIndex: 1,
        position: 'absolute',
    },
});

export default LevelUpAnimation;