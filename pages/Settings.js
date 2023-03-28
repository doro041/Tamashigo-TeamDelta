import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, Pressable, TouchableOpacity, Switch } from 'react-native';
import Footer from '../components/Footer.js'
import Slider from '@react-native-community/slider';


const Settings = ({ navigation }) => {
    const [helpVisible, setHelpVisible] = useState(false);
    const [notifIsEnabled, setNotifIsEnabled] = useState(false);
    const notifSwitch = () => setNotifIsEnabled(previousState => !previousState);
    const [sliderValue, setSliderValue] = useState(15);
    const [shortBreakValue, setShortBreakValue] = useState(5);
    return (

        <View style={styles.container}>
            <View style={styles.title}>
                <Text>Settings</Text>
            </View>
            <View style={styles.section}>
                <Text>Account</Text>
                <Pressable>
                    <Image source={require('../assets/premiumEgg.png')} style={{ flex: 1, resizeMode: "center" }}></Image>
                    <Text>Go to Premium!</Text>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text>Notification</Text>
                <Switch onValueChange={notifSwitch} value={notifIsEnabled} />
            </View>
            <View style={styles.section}>
                <Text>Sound</Text>
                <Image source={require('../assets/mute.png')} style={{ flex: 0.1, resizeMode: "center" }} />
                <Slider
                    maximumValue={25}
                    minimumValue={0}
                    minimumTrackTintColor="#307ecc"
                    maximumTrackTintColor="#000000"
                    step={1}
                    value={sliderValue}
                    onValueChange={(sliderValue) => setSliderValue(sliderValue)}
                    style={{ flex: 0.5 }}
                />
                <Image source={require('../assets/soundOn.png')} style={{ flex: 0.1, resizeMode: "center" }} />
            </View>
            <View style={styles.section}>
                <Text>Pomodoro Timing</Text>
            </View>
            <View style={styles.section}>
                <Text>Helping Center</Text>
                <Modal animationType="slide" transparent={true} visible={helpVisible}>
                    <View style={styles.help}>
                        <Text>F.A.Q & Help</Text>
                        <TouchableOpacity onPress={() => setHelpVisible(!helpVisible)} style={{ paddingRight: 10 }}>Cancel</TouchableOpacity>
                    </View>
                </Modal>
                <TouchableOpacity onPress={() => setHelpVisible(true)}>
                    <Text>See more Information! ►</Text>
                </TouchableOpacity>
            </View>
            <Footer></Footer>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginRight: '100%',
        width: '100%',
        backgroundColor: "#FFFDFF",
    },
    title: {
        flex: 1,
        backgroundColor: "#97A67E",
    },
    section: {
        flex: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    help: {
        margin: "auto",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});


export default Settings;