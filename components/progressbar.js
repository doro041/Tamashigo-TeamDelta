import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const XPProgressBar = ({ currentXP, totalXP }) => {
  // Calculate the percentage of XP completed
  // and use that to set the width of the progress bar
  // (e.g. 50% complete = 50% width)
  // Note: we use a template string to set the width
 

  const percentComplete = (currentXP / totalXP) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.xpBar, { width: `${percentComplete}%` }]} />
      <Text style={styles.xpText}>{`${percentComplete}%`}</Text>
    </View>
  );
};

// Styles
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
  xpBar: {
    height: '100%',
    backgroundColor: 'green',
    borderRadius: 30,
    width: '50%'

  },
  xpText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});

export default XPProgressBar;