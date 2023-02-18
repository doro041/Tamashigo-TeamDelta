import React, { useState } from 'react';
import { View, Text, Switch, Modal, StyleSheet,Picker,TextInput  } from 'react-native';

function Settings() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [petName, setPetName] = useState('Pet');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('8:00 AM');

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Sound</Text>
        <Switch
          value={isSoundEnabled}
          onValueChange={value => setIsSoundEnabled(value)}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={value => setIsDarkModeEnabled(value)}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Pet Name</Text>
        <TextInput
        style={styles.input}
        value={petName}
        onChangeText={setPetName}
      />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Restart</Text>
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Delete Account</Text>
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingText}>Phone Notifications</Text>
        <Switch onValueChange={() => setIsModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>Select Times</Text>
          <Picker
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            <Picker.Item label="Afternoon 15:00" value="15:00 PM" />
            <Picker.Item label="Evening 18:00" value="18:00 PM" />
            <Picker.Item label="Night 20:00" value="20:00 PM" />
            
            </Picker>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },


  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  settingText: {
    fontSize: 18,
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    width: 200

  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
