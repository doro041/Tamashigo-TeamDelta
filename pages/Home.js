import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, Image,TouchableOpacity,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Footer from './Footer';




 
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
});
function Home () {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>

        <XPProgressBar />

     

      </View>



      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}

        style={{ alignSelf: 'flex-end', position: 'absolute', top: 0, right: 0, marginTop: 20, marginRight: 20 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="black" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </TouchableOpacity>



      




      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, }}>

        <Footer />

      </View>
    </SafeAreaView>

  );
}

export default Home;

