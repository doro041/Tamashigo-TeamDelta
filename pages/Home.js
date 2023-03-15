import React from 'react';
import {View, Text, ImageBackground, ScrollView, TextInput,Image,StyleSheet} from 'react-native';


import Header from '../components/Header';
import Footer from '../components/Footer';
import {useNavigation} from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Header>
          
      <Text style={styles.text}>Welcome {name}!</Text>
      </Header>
            <ImageBackground source={require('../assets/NameChar.png')} style={{width: '100%', height: '100%'}}>
                <Image source={require('../assets/Panda.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
               
                   
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  
                </View>
            </ImageBackground>
            <Footer/>

        </View>

    )
  }

  export default Home;

  const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: 'Raleway',
        color: 'black',
        alignContent: 'center',
        },
       
    });

  