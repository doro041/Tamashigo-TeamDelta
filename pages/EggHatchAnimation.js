import React, { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const EggHatchAnimation = () => {
  const navigation = useNavigation();

  // state variable to check if the component is mounted
  const [isMounted, setIsMounted] = useState(true);

  // create four Animated.Value instances using useRef()
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const openAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  // shaking animation
  const shaking = () => {
    // use Animated.loop and Animated.sequence to create a shaking animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 1, duration: 100, delay: 100 }),
        Animated.timing(shakeAnim, { toValue: -1, duration: 100, delay: 100 }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 100 }),
      ]),
      { iterations: 6 }
    ).start();
  };

  // interpolate the shake animation to create rotation
  const interpolateRotation = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'],
  });

  // opening animation
  const opening = () => {
    // use Animated.timing to create an opening animation
    Animated.timing(openAnim, {
      toValue: 1,
      duration: 3000,
      delay: 5000,
    }).start();
  };

  // interpolate the opening animation to create rotation and translation
  const interpolateOpen = openAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  });

  const interpolateTransTopOpen = openAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  });

  const interpolateTransBotOpen = openAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  // panda scaling animation
  const pandaScaling = () => {
    // use Animated.timing to create a scaling animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  };

  // interpolate the panda scaling animation to create scale
  const interpolatePandaScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 3],
  });

  // fade out animation
  const fadeOut = () => {
    // use Animated.timing to create a fade out animation
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      delay: 5000,
      duration: 3000,
    }).start();
  };

  // interpolate the fade out animation to create opacity
  const interpolateFadeOut = fadeOutAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  // useEffect() to run animations when the component mounts
  useEffect(() => {
    if (isMounted) {
      // run all the animations here
      shaking();
      opening();
      fadeOut();
      pandaScaling();
    }


    // clean up function to set isMounted to false
    return () => setIsMounted(false);
    }, []);

    




  return (	
    <View style={styles.container}>	
   <ImageBackground source={require('../assets/PartsLog.png')} style={styles.backgroundImage}/>
 
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
        flex: 1,
        position: 'relative',
        zIndex: 0,
      },
      backgroundImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        zIndex: -1,
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
button: {
    alignItems: "center",
    alignSelf: 'flex-end',
    backgroundColor: "#DDDDDD",
    padding: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 4,
    },
topEgg: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
},
bottomEgg: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
},

});	
export default EggHatchAnimation;