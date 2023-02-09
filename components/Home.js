import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircleButton from './CircleButton';
import { StyleSheet } from 'react-native';
import Footer from './Footer';
import XPProgressBar from './progressbar';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CEB0FF'
  },
  text: {
    fontSize:20,
    margin: 10
  },
  image: {
    width: 500,
    height: 300,
    alignSelf: 'center',
    margin: 20
  }
});
const Home = ({ route }) => {
  const { name } = route.params;
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
     <View >
     <XPProgressBar/>
        
        <Image source={require('../components/WORK.png')} style={styles.image} />
      </View>
     
      <View style={{ alignSelf: 'flex-end', position: 'absolute', top: 0, right: 0,marginTop:20,marginRight:20}}>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
  </View>
      <View style={{ alignSelf: 'flex-start', position: 'absolute', top: 0, left: 0 }}>
    <Image source={require('../components/LOGO1.png')} style={{height:100, width:100, justifyContent: 'flex-start',marginTop:10}} />
  </View>
<Text style={styles.text}>{`Welcome, ${name}!`}</Text>

<View style={{position:'absolute',bottom:0,left:0,right:0}}>

  <Footer/>
  </View>
   </SafeAreaView>

  );
};

export default Home;

