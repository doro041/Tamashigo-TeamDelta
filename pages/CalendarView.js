import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

const years = [2021, 2022, 2023]; // You can add more years to this array

const months = [
  { name: 'January', days: 31 },
  { name: 'February', days: 28 },
  { name: 'March', days: 31 },
    { name: 'April', days: 30 },
    { name: 'May', days: 31 },
    { name: 'June', days: 30 },
    { name: 'July', days: 31 },
    { name: 'August', days: 31 },
    { name: 'September', days: 30 },
    { name: 'October', days: 31 },
    { name: 'November', days: 30 },
    { name: 'December', days: 31 },

  
];

const generateDays = () => {
  let result = [];
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    for (let j = 0; j < months.length; j++) {
      const month = months[j];
      const daysInMonth = month.days;
      for (let k = 1; k <= daysInMonth; k++) {
        const date = k.toString();
        const day = new Date(year, j, k).toLocaleDateString('en-US', { weekday: 'short' });
        result.push({ date, day, tasks: [] });
      }
    }
  }
  return result;
};

const CalendarItem = ({ date, day, tasks }) => {
  return (
    <View style={styles.calendarItem}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.day}>{day}</Text>
      {tasks.map(task => (
        <Text key={task} style={styles.task}>{task}</Text>
      ))}
    </View>
  );
};

const VerticalCalendar = () => {
  const days = generateDays();

  return (
    <ScrollView>
      <Header />
      <FlatList
        data={days}
        renderItem={({ item }) => (
          <CalendarItem
            date={item.date}
            day={item.day}
            tasks={item.tasks}
          />
        )}
        keyExtractor={item => item.date}
        style={styles.calendarList}
      />
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calendarList: {
    paddingVertical: 10,
  },
  calendarItem: {
    height: 100,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  day: {
    fontSize: 16,
    marginTop: 5,
    fontWeight:'bold',
    
  },
  task: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default VerticalCalendar;
