import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {AntDesign} from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';


const Header = ({ title, onSettingsPress = () => {} }) => {
  const navigation = useNavigation(); // obtain the navigation object

  const handleSettingsPress = () => {
    onSettingsPress();
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSettingsPress} style={styles.iconContainer}>
        <Icon name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>

    <View style = {{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Icon name="person-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
        paddingHorizontal: 20,
        width: '100%',
        zIndex: 1,
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
