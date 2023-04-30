import React, { useRef, useEffect,useState } from 'react';	
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated,ImageBackground } from 'react-native';	
import { useNavigation } from '@react-navigation/native';	
import { FontAwesome } from 'react-native-vector-icons';



const EggHatchAnimation = () => {	
  const navigation = useNavigation();	
  const handlePandaPress = () => {	
    navigation.navigate('NameChar');	
  };	
  const [isMounted, setIsMounted] = useState(true); // This is the state variable	
  const shakeAnim = useRef(new Animated.Value(0)).current;	
  const openAnim = useRef(new Animated.Value(0)).current;	
  const scaleAnim = useRef(new Animated.Value(0)).current;	
  const fadeOutAnim = useRef(new Animated.Value(1)).current;	
  const shaking = () => {	
   	
      Animated.loop(	
          Animated.sequence([	
              Animated.timing(shakeAnim, { toValue: 1, duration: 100, delay: 100 }),	
              Animated.timing(shakeAnim, { toValue: -1, duration: 100, delay: 100 }),	
              Animated.timing(shakeAnim, { toValue: 0, duration: 100 }),	
          ]),	
          { iterations: 6 }	
      ).start();	
  };	
  const interpolateRotation = shakeAnim.interpolate({	
    inputRange: [-1, 1],	
    outputRange: ['-10deg', '10deg'],	
  });	
  

  const opening = () => {
    Animated.timing(openAnim, {
        toValue: 1,
        duration: 3000,
        delay: 5000,
    }).start();
};
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


const pandaScaling = () => {
    Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 10000,
    }).start();
};
const interpolatePandaScale = scaleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 3],
  });
const fadeOut = () => {
    Animated.timing(fadeOutAnim, {
        toValue: 0,
        delay: 5000,
        duration: 3000,
    }).start();
  };	

  const interpolateFadeOut = fadeOutAnim.interpolate({	
    inputRange: [0, 1],	
    outputRange: [0, 150],	
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
       
        <TouchableOpacity onPress={handlePandaPress} style={styles.button}>
  <FontAwesome name="arrow-right" size={24} color="black" />
</TouchableOpacity>

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