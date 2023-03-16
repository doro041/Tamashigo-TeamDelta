import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';


const Pomodoro = () => {
    return (
        <View style={styles.container}>
        <Header />
        <Text style={styles.text}>Pomodoro</Text>
        <Footer />
        </View>
    );
    }



const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 20,
        paddingVertical: 30,


    },
    text : {
        fontSize: 16,
        marginBottom: 10,

    },

});

export default Pomodoro;
