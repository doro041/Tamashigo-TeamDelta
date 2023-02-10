import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Animated } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from './ProgressBar';



const Profile = () => {
  const [level, setLevel] = useState(1);
  const navigation = useNavigation();
  const styles = StyleSheet.create  = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
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
  };


  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignSelf:'auto',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CEB0FF'
    }}>
     

       <Text style={{fontSize:40,fontFamily: 'Gideon Roman'}}> Level:</Text>
  <Text style={{fontSize:100,fontFamily: 'Gideon Roman'}}>{level}</Text>
  
  <ProgressBar style={{ width: 50, height: 50, resizeMode:'contain '}} />
  <Text style={styles.text}>{`Welcome, ${name}!`}</Text>

</View>





      
  );
};
export default Profile;

