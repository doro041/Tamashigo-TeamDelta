import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const navigation = useNavigation();
  const name = "Bo"; // just for demo purpose

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={styles.text}>Welcome {name}!</Text>
      </Header>
      <View style={styles.container}>
       
        <ImageBackground source={require('../assets/NameChar.png')} style={{ width: '100%', height: '100%' }}>
            <View style={{marginTop:60,justifyContent: 'flex-end'}}>
                <Image source={require('../assets/egg.png')} style={{ width: 100, height: 100, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                <Text style={{ position: 'absolute', bottom: 0, right: 0 }}>1</Text>
            </View>
            <View style ={{marginBottom:10,justifyContent:'flex-start'}}>
                <Image source={require('../assets/coin.png')} style={{ width: 25, height: 30, resizeMode: 'contain', alignSelf: 'flex-start' }} />
                <Text style={{ position: 'absolute', bottom: 0, right: 0 }}>1</Text>
            </View>
          <View style={styles.character}>
            <Image source={require('../assets/Panda.png')} style={{ width: 200, height: 300, resizeMode: 'contain' }} />
          </View>
          <View style={styles.balloon}>
            <Text style={styles.text}>Hi,my name is {name}!</Text>
          </View>
        </ImageBackground>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'Raleway',
    color: 'black',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  character: {
    position: 'absolute',
    center: 0,
    bottom:0,
    alignSelf: 'center',
    margin: 30,

  },
  balloon: {
    position: 'absolute',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 10,
    width: 200,
    height: 100,
    bottom: 300,
    left: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
