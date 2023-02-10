import React, { useState } from 'react';
import { View, Text, Switch, Modal, StyleSheet } from 'react-native';

function Settings({ navigation }) {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [petName, setPetName] = useState('Pet');
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <Text>{petName}</Text>
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
          {/* Add logic to select times */}
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
    marginVertical: 10,
  },
  settingText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
