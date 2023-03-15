import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="home" size={30} color="black" />
      </View>
      <View style={styles.iconContainer}>
        <Icon name="timer" size={30} color="black" />
      </View>
      <View style={styles.iconContainer}>
        <Icon name="calendar" size={30} color="black" />
      </View>
      <View style={styles.iconContainer}>
        <Icon name="cart" size={30} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconContainer: {
    marginHorizontal: 30,
  },
});

export default Footer;
