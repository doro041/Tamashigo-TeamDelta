import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaskItem from './TaskItem';
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

const years = [2023]; // You can add more years to this array



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
  const numDaysToDisplay = Math.min(numDays, 7); // limit the number of days to display to 7 or less
  let result = [];
  let count = 0;

  const taskDatesMap = taskDates.reduce((map, date, index) => {
    const dateString = date.toLocaleDateString();
    if (!map[dateString]) {
      map[dateString] = [];
    }
    map[dateString].push(tasks[index]);
    return map;
  }, {});

  for (let i = 0; i < years.length && count < numDaysToDisplay; i++) {
    const year = years[i];
    for (let j = 0; j < months.length && count < numDaysToDisplay; j++) {
      const month = months[j];
      const daysInMonth = month.days;
      for (let k = 1; k <= daysInMonth && count < numDaysToDisplay; k++) {
        const date = k.toString();
        const day = new Date(year, j, k).toLocaleDateString('en-US', { weekday: 'short' });
        const dateString = new Date(year, j, k).toLocaleDateString();
        const tasksForDate = taskDatesMap[dateString] || [];

        let filteredTasks = tasks
  .map((task, idx) => {
    const taskDate = new Date(taskDates[idx]);
    if (
      taskDate.getFullYear() === year &&
      taskDate.getMonth() === j &&
      taskDate.getDate() === k
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

    
        if (count < 7) {
          result.push({ date, day, tasks: filteredTasks });
        } else if (count === 7) {
          result.push({ message: 'Purchase premium to get more.' });
        }
        count++;

        
      }
    }
  }
  return result;
};




const CalendarItem = ({ date, day, tasks }) => {
  return (
    <View style={styles.calendarItem}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.day}>{day}</Text>
      </View>
      <ScrollView style={styles.tasksContainer}>
        {tasks.map((task, index) => (
          console.log("Tasks to TaskItem Vertical Calendar: ", task.title + " " + task.priority + " " + task.category) ||
          <TaskItem
            key={index}
            task={task.title}
            priorityIcon={priorityValues[task.priority].value}
            categoryColor={selectedCategoryColors[task.category]}
            // Add any other necessary props required by your Task component
          />
        ))}
      </ScrollView>
    </View>
  );
};



const VerticalCalendar = ({ route }) => {
  
  const { tasks, taskDates, priorities, categories } = route.params;
  console.log("Vertical Calendar: ", tasks, taskDates, priorities, categories)
  const days = generateDays(7, tasks, taskDates, priorities, categories); // display up to 7 days



  return (
    <ScrollView>
            <Header />
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
      />
     <Footer
        taskItems={tasks}
        deadlines={taskDates}
        valueList={priorities}
        categoriesList={categories}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
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
    flexGrow: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
    marginRight: 5,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default VerticalCalendar;