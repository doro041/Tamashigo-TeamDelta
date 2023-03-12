import React from 'react';
import {View, Text, Image, ScrollView, TextInput} from 'react-native';



const Login = () => {

return (
    <View
    style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }}
    >
        <Image
        source={require('../assets/logo1.png')}
        style={{width: 200, height: 300, resizeMode: 'contain'}}
        />
        <Text Input placeholder="Username" style={{fontSize: 20, fontWeight: 'bold', marginBottom: '5%'}}/>
        <Text Input placeholder="Password" style={{fontSize: 20, fontWeight: 'bold', marginBottom: '5%'}}/>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: '5%'}}>Forgot Password?</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: '5%'}}>Don't have an account? Sign Up</Text>
    </View>
);
};


export default Login;