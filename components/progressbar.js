import React, { useState } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const ProgressBar = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  const updateProgress = () => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 1000,
    }).start();
  };

  const getColor = () => {
    if (progress._value < 33) {
      return 'red';
    } else if (progress._value < 66) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.progress, { width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }, { backgroundColor: getColor() }]}
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    height: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width:'50%',
    marginLeft: 20,
    marginRight: 20,



  },
  

  progress: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 30,
    width: '50%',
  },

});

export default ProgressBar;