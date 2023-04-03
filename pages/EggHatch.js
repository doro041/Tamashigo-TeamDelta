import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import FastImage from 'react-native-fast-image';

const EggHatchAnimation = ({ onAnimationEnd }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const hatchAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const hatchSequence = Animated.sequence([
      Animated.delay(1000),
      Animated.timing(hatchAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
    ]);

    const fullSequence = Animated.sequence([fadeIn, hatchSequence]);

    fullSequence.start(() => {
      if (onAnimationEnd) onAnimationEnd();
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            },
          ],
        }}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          resizeMode={FastImage.resizeMode.contain}
          source={require('./assets/egg.png')}
        />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: hatchAnim,
            transform: [
              {
                translateY: hatchAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -50],
                }),
              },
            ],
          }}>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            resizeMode={FastImage.resizeMode.contain}
            source={require('./assets/Panda.png')}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default EggHatchAnimation;
