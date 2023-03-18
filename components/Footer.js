import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation(); // obtain the navigation object

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}> 
      <TouchableOpacity>
      <Icon name="timer" size={30} color="black" />
        </TouchableOpacity>
       
      </View>
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
      <Icon name="calendar" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
      <TouchableOpacity>
      <Icon name="cart" size={30} color="black" />
        </TouchableOpacity>
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
