import React, { useState } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const MyCalendar = ({ setDeadline }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0,7));
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setDeadline(day.dateString);
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month.dateString);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    if (selectedDate) {
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(time.getHours());
      selectedDateTime.setMinutes(time.getMinutes());
      setDeadline(selectedDateTime.toISOString());
    }
    hideTimePicker();
  };

  const handleTimeChange = (event) => {
    if (selectedDate) {
      const [hours, minutes] = event.target.value.split(':');
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(hours);
      selectedDateTime.setMinutes(minutes);
      setDeadline(selectedDateTime.toISOString());
    }
  };

  return (
    <View style={styles.container}>
      <Calendar 
        onDayPress={handleDayPress} 
        current={currentMonth}
        onMonthChange={handleMonthChange}
        theme={{
          backgroundColor: '#FFFFFF',
          calendarBackground: '#F5FCFF',
          textSectionTitleColor: '#B6C1CD',
          selectedDayBackgroundColor: '#007AFF',
          selectedDayTextColor: '#FFFFFF',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#007AFF',
          selectedDotColor: '#FFFFFF',
          arrowColor: '#007AFF',
          monthTextColor: '#007AFF',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
        style={styles.calendar}
      />
      {selectedDate && (
        <View style={styles.selectedInfo}>
          <View 
  style={{ 
    
    padding: 10, 
    marginTop: 60,
    alignItems: 'center',
  }}
>
  <Text style={styles.text}>You selected {selectedDate}</Text>
</View>
          {Platform.OS === 'web' ? (
            <input type="time" onChange={handleTimeChange} />
          ) : (
            <>
              <TouchableOpacity 
  onPress={showTimePicker} 
  style={{ 
    borderWidth: 1, 
    borderRadius: 5, 
    padding: 10, 
    alignSelf: 'center',
  }}
>
  <Text style={styles.text}>Pick a time</Text>
</TouchableOpacity>

              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 0,
  },
  calendar: {
    width: 250,
    height: 300,
  },
  selectedInfo: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10, 
  },
});


export default MyCalendar;
