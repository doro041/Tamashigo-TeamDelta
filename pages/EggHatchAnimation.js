import React from 'react';
import { View, Image, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';


const EggHatchAnimation = ({ navigation }) => {
  const handlePress = () => {
    console.log('Pressed');
    navigation.navigate('Beginning');
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/NameChar.png')} style={styles.background}>
        <Image
          style={styles.gif}
          source={require('../assets/pandas.gif')}
        />

        <TouchableOpacity onPress={handlePress}>
          <Text>Click me</Text>
        </TouchableOpacity>
      </ImageBackground>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: '100%',
    height: '59%',
    resizeMode: 'contain',
    margin: 10,
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default EggHatchAnimation;
