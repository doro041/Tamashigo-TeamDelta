import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


const now = new Date();
const thirtyDaysLater = new Date();
thirtyDaysLater.setDate(now.getDate() + 30);

function CalendarP() {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const onDayPress = day => {
    setSelectedDate(day);
  };

  return (
    <View style={styles.container}>
      <CalendarList
        style={styles.calendar}
        horizontal={true}
        pagingEnabled={true}
        calendarWidth={320}
        minDate={now}
        maxDate={thirtyDaysLater}
        onDayPress={onDayPress}
      />
      <ScrollView style={styles.datesContainer}>
        {[...Array(30)].map((_, index) => {
          const date = new Date(now.getTime());
          date.setDate(now.getDate() + index);
          return (
            <View style={styles.dateRow} key={index}>
              <Text style={styles.dateText}>{date.toDateString()}</Text>
              {selectedDate && selectedDate.dateString === date.toDateString() && (
                <Text style={styles.selectedText}>(selected)</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    marginTop: 20,
  },
  datesContainer: {
    marginTop: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    marginRight: 10,
  },
  selectedText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default CalendarP;