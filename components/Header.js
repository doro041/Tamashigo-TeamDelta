import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ title, onSettingsPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSettingsPress} style={styles.iconContainer}>
        <Icon name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginRight: 10,
    color : 'black',
    
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
});

export default Header;
