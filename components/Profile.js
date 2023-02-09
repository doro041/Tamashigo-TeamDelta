import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const [level, setLevel] = useState(1);
    const navigation = useNavigation();


  return (
    <View style={{ flex: 1, absolute:0 ,alignItems: 'center', justifyContent: 'center' }}>
       <Text style={{fontSize:40,fontFamily: 'Gideon Roman'}}> Level:</Text>
  <Text style={{fontSize:100,fontFamily: 'Gideon Roman'}}>{level}</Text>
</View>

      
  );
};
export default Profile;

