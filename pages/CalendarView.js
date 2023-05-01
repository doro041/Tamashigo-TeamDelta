import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskItem from '../components/TaskItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const selectedCategoryColors = {
  'Productivity': '#dce4ef',
  'Health': '#94bfa2',
  'Finances': '#fad980',
  'Hobbies': '#f9dede',
};

const priorities = ['Low', 'Medium', 'High', 'Critical'];

const priorityValues = [
  {index: 0, label: priorities[0], value: <MaterialCommunityIcons name="snail" size={24} color="black" />},
  {index: 1, label: priorities[1], value: <Feather name="alert-circle" size={24} color="black" />},
  {index: 2, label: priorities[2], value: <FontAwesome name="exclamation-triangle" size={24} color="black" />},
  {index: 3, label: priorities[3], value: <Feather name="zap" size={24} color="black" />},
];

const currentYear = new Date().getFullYear();
const years = [currentYear];




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

const generateDays = (numDays, tasks, taskDates, priorities, categories) => {
  let result = [];
  let count = 0;
  const today = new Date(); // get the current date

  const taskDatesMap = taskDates.reduce((map, date, index) => {
    const dateString = date.toLocaleDateString();
    if (!map[dateString]) {
      map[dateString] = [];
    }
    map[dateString].push(tasks[index]);
    return map;
  }, {});

  let currentMonth = today.getMonth();
  let currentDate = today.getDate();

  for (let i = 0; i < numDays && count < numDays; i++) {
    const year = today.getFullYear();
    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();

    if (currentDate > daysInMonth) {
      // if we've gone beyond the last day of the current month, skip to the next month
      currentMonth++;
      currentDate = 1;
    }

    const date = currentDate.toString();
    const day = new Date(year, currentMonth, currentDate).toLocaleDateString('en-GB', { weekday: 'short' });
    const dateString = new Date(year, currentMonth, currentDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
    const tasksForDate = taskDatesMap[dateString] || [];

    let filteredTasks = tasks
      .map((task, idx) => {
        const taskDate = new Date(taskDates[idx]);
        if (
          taskDate.getFullYear() === year &&
          taskDate.getMonth() === currentMonth &&
          taskDate.getDate() === currentDate
        ) {
          return {
            title: task,
            priority: priorities[idx],
            category: categories[idx],
          };
        }
        return null;
      })
      .filter(task => task !== null);
      result.push({ date, day, tasks: filteredTasks });

   
      count++;

      currentDate++;
  }
  return result;
};







const CalendarItem = ({ date, day, tasks }) => {
  const itemHeight = 100 + tasks.length * 60; // Calculate item height based on number of tasks

  return (
    <View style={[styles.calendarItem, { height: itemHeight }]}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      <View style={styles.tasksContainer}>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task.title}
            priorityIcon={priorityValues[task.priority].value}
            categoryColor={selectedCategoryColors[task.category]}
            onCompleteTask={() => {}}
          />
        ))}
      </View>
    </View>
  );
};




const VerticalCalendar = ({ route }) => {
  const {tasks, taskDates, priorities, categories } = route.params;
  const days = generateDays(14, tasks, taskDates, priorities, categories);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.calendarContainer}>
        <FlatList
          data={days}
          renderItem={({ item }) => {
            if (item.message) {
              return (
                <View style={styles.messageContainer}>
                  <Text style={styles.message}>{item.message}</Text>
                </View>
              );
            } else {
              return (
                <CalendarItem
                  date={item.date}
                  day={item.day}
                  tasks={item.tasks}
                />
              );
            }
          }}
          keyExtractor={(item, index) => item.date || index.toString()}
          style={styles.calendarList}
          scrollEnabled={false} // Disabling scroll for FlatList since ScrollView is handling it
        />
      </ScrollView>
      <Footer
        taskItems={tasks}
        deadlines={taskDates}
        valueList={priorities}
        categoriesList={categories}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2f8dc',

  },
  calendarContainer: {
    flex: 1,
    
  },
  calendarList: {
    flexGrow: 1,
    paddingBottom: 40, // Add padding to prevent days from being hidden behind the Footer
    paddingTop: 40, // Add padding to prevent days from being hidden behind the Header
  },
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100, // Maintain a fixed height for calendar items to ensure they fill the space
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  date: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksContainer: {
    flex: 1,
    },
  messageContainer: {
    paddingHorizontal:20,
    paddingVertical: 10,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
  },
 
});






export default VerticalCalendar;