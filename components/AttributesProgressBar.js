import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttributesProgressBar = ({ progress, level, maxLevel, barHeight }) => {
  const filledWidth = (progress / maxLevel) * 100;

  return (
    <View style={[styles.progressBar, { height: barHeight }]}>
      <View style={[styles.filled, { width: `${filledWidth}%` }]} />
      <View style={styles.levelContainer}>
        <Text style={styles.level}>
          {level}/{maxLevel}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    backgroundColor: '#ffedd6',
    width: 130,
    borderRadius:9,
    borderColor:'#000000',
    borderWidth:3,
  },
  filled: {
    backgroundColor: 'lightgreen',
    borderRadius:11,
  },
  levelContainer: {
    position: 'absolute',
    right: 5,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  level: {
    fontWeight: 'bold',
     fontWeight:'90%',
  },
});

export default AttributesProgressBar;
