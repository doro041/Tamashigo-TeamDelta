import React, { useRef } from 'react';
import { Animated, View } from 'react-native';

const LevelUp = () => {
    // Create an animated value to keep track of the current frame
    const animation = useRef(new Animated.Value(0)).current;
  
    // Define the sequence of images that will be used in the animation
    const images = [
      require('./assets/egg1.png'),
      require('./assets/egg2.png'),
      require('./assets/egg3.png'),
    ];
  
    // Define the animation configuration
    const config = {
      toValue: images.length - 1,
      duration: 1000,
      useNativeDriver: true,
    };
  
    // Define the animation function
    const animate = () => {
      Animated.timing(animation, config).start(({ finished }) => {
        if (finished) {
          animation.setValue(0);
          animate();
        }
      });
    };
  
    // Start the animation when the component mounts
    React.useEffect(() => {
      animate();
    }, []);
  
    // Create a sequence of animated image components
    const animatedImages = images.map((image, index) => {
      const opacity = animation.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp',
      });
  
      return (
        <Animated.Image
          key={index}
          source={image}
          style={{ opacity }}
          resizeMode="contain"
        />
      );
    });
  
    // Return the animated image sequence inside a View component
    return <View style={{ flex: 1 }}>{animatedImages}</View>;
  };
  
  export default LevelUp;