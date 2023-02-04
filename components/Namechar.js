import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

const Namechar = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Home', { name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pick a name for your character:</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.arrowButton} onPress={onPress}>
        <View style={styles.arrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9F5DD',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 80,
    fontFamily: 'Gideon Roman',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 80,
    borderRadius: 20,
    backgroundColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: '#fff',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
  },
});

export default Namechar;