import React from 'react';

import  { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Namechar = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();
  
    const onPress = () => {
      navigation.navigate('Home', { name });
    };
  
    return (
        
        <View style={{ backgroundColor: '#E9F5DD', flex: 1 }}>>
        <Text style ={{ fontSize: 48, fontFamily: 'Gideon Roman' }}>Pick a name for your character:</Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
        />
        <Button title="Go to Home Screen" onPress={onPress} />
      </View>
    );
  };

    export default Namechar;