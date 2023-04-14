import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button ,ImageBackground,Image,TouchableOpacity} from 'react-native';

const ForgotPass = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // handle reset password logic here, e.g. send reset password email
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/PartofLogo.png')} style={styles.background}>
        <Image source={require('../assets/PandaHead.png')} style={{ margin: '10%', width: 200, height: 300, resizeMode: 'contain' }} />
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.text}>
          Enter your email address below and we'll send you a link to reset your password.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <TouchableOpacity title="Set Instructions" onPress={handleResetPassword} 
        style={{backgroundColor:'black',width: '50%',height: 50,borderRadius: 25,alignItems: 'center',justifyContent: 'center',marginBottom: 20,marginTop:20,alignSelf: 'center',}}>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
        background: {
        flex: 1,
        width: '100%',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'grey',
    paddingLeft: 20,
    marginBottom: 20,
    marginTop:20,
    alignSelf: 'center',
  },
});

export default ForgotPass;