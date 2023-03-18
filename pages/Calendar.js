import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';


const Calendar = () => {
    return (
     
        <View style={styles.container}>
               <Header/>

        <Text style={styles.title}>Calendar</Text>
        <Footer/>
        </View>
       
    );
    }

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 60,
        paddingHorizontal: 20,
        width: '100%',
        zIndex: 1,
        },
    title: {
        fontSize: 20,
        color: 'black',

    },
});

export default Calendar;
