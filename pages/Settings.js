import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, Pressable, TouchableOpacity, Switch } from 'react-native';
import Footer from '../components/Footer.js';
import { Picker } from '@react-native-picker/picker';
import LevelUpAnimation from '../components/LevelUpAnimation.js';

const Settings = () => {
    const [helpVisible, setHelpVisible] = useState(false);
    const [notifIsEnabled, setNotifIsEnabled] = useState(false);
    const notifSwitch = () => setNotifIsEnabled(previousState => !previousState);
    const [sliderValue, setSliderValue] = useState(15);
    const [selectedShortBreak, setSelectedShortBreak] = useState();
    const [selectedLongBreak, setSelectedLongBreak] = useState();
    const [selectedFocus, setSelectedFocus] = useState();
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
                <Pressable>
                    <Image source={require('../assets/cryPanda.png')} style={{ flex: 1.5, resizeMode: "center" }}></Image>
                    <Text>Delete It?</Text>
                </Pressable>
            </View>
            <View style={styles.section}>
                <Text>Notification</Text>
                <Switch onValueChange={notifSwitch} value={notifIsEnabled} />
                <LevelUpAnimation isMounted={true}></LevelUpAnimation>
            </View>
            <View style={styles.section}>
                <Text>Pomodoro Timing</Text>
                <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View>
                        <Text>Short Break</Text>
                        <Picker
                            selectedValue={selectedShortBreak}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedShortBreak(itemValue)
                            }>
                            <Picker.Item label="3" value="3 min" />
                            <Picker.Item label="5" value="5 min" />
                            <Picker.Item label="7" value="7 min" />
                        </Picker>
                    </View>
                    <View>
                        <Text>Long Break</Text>
                        <Picker
                            selectedValue={selectedLongBreak}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedLongBreak(itemValue)
                            }>
                            <Picker.Item label="10" value="10 min" />
                            <Picker.Item label="15" value="15 min" />
                            <Picker.Item label="20" value="20 min" />
                        </Picker>
                    </View>
                    <View>
                        <Text>Focus</Text>
                        <Picker
                            selectedValue={selectedFocus}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedFocus(itemValue)
                            }>
                            <Picker.Item label="25" value="25 min" />
                            <Picker.Item label="35" value="35 min" />
                            <Picker.Item label="45" value="45 min" />
                        </Picker>
                    </View>
                </View>
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