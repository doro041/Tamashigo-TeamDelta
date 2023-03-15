import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Icon name="home" size={30} color="#888" />
      <Icon name="timer" size={30} color="#888" />
        <Icon name="person" size={30} color="#888" />
      <Icon name="cart" size={30} color="#888" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default Footer;