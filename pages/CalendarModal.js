import React from 'react';
import { View, Modal, StyleSheet, Button } from 'react-native';
import MyCalendar from './MyCalendar';

const CalendarModal = ({ visible, setVisible, setDeadline }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.closeButton}>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
        <MyCalendar setDeadline={setDeadline} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});

export default CalendarModal;
