import react from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet,Image  } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';


const Profile  = () => {


    return (
        <View style={styles.container}>
        <Header />
        <Image source={require('../assets/Profile.svg')} style={styles.image} />
        <Text style={styles.text}>Profile</Text>
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


export default Profile;