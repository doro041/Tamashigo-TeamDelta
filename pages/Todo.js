import react from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet,Image  } from 'react-native';



const Todo  = () => {
    
        return (
            <View style={styles.container}>
            <Header />
            <Image source={require('../assets/Profile.svg')} style={styles.image} />
            <Text style={styles.text}>Profile</Text>
            <Footer />
            </View>
        );
        }

export default Todo;


const styles = StyleSheet.create({
   text : {
        fontSize: 16,
        marginBottom: 10,
    },




});
