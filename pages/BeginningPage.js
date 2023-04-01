import React from 'react';
import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground,Animated  } from 'react-native';


const BeginningPage = ({ navigation }) => {
  const [eggOpacity, setEggOpacity] = useState(new Animated.Value(1));
  const [pandaOpacity, setPandaOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(eggOpacity, {
        toValue: 0,
        duration: 10000,
        useNativeDriver: true,
      }),
      Animated.timing(pandaOpacity, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);


  
  return (
   
    <View style={styles.container}>
     
      <ImageBackground source={require('../assets/Bg.png')} style={styles.background}>
        <Image source={require('../assets/logo1.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
        <Text style={styles.title}>Welcome to Tamashigo</Text>
        <Text style={styles.subtitle}>Where productivity meets fun!</Text>

        <Animated.Image source={require('../assets/egg.png')} style={[styles.egg, { opacity: eggOpacity }]} />
        <Animated.Image source={require('../assets/Panda.png')} style={[styles.panda, { opacity: pandaOpacity }]} />
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={() => navigation.navigate('Login')}
        >
         
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'white', borderColor: 'black', borderWidth: 1, color: 'black',fontSize: 20, fontWeight: 'bold' }]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>SIGN UP</Text>
</TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '20%',
    marginTop: '10%',
    alignContent: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '20%',
    alignContent: 'center',
    fontStyle: 'italic'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: '30%',

  },
  button: {
    width: '30%',
    
    borderRadius: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
  egg: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 100,
    left: 100,
  },
  panda: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 100,
    left: 100,
  },
});

export default BeginningPage;