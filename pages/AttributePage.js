import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Attributes from './Attributes';
import Footer from '../components/Footer';

const AttributePage = ({ navigation, productivityCoins, healthCoins, financeCoins, hobbyCoins }) => {
  return (
    <View style={styles.container}>
      <Attributes
        productivityCoins={productivityCoins}
        healthCoins={healthCoins}
        financeCoins={financeCoins}
        hobbyCoins={hobbyCoins}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
});

export default AttributePage;