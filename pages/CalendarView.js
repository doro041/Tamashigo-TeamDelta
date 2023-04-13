import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';



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

        let filteredTasks = tasks.filter((_, idx) => {
          const taskDate = new Date(taskDates[idx]);
          return (
            taskDate.getFullYear() === year &&
            taskDate.getMonth() === j &&
            taskDate.getDate() === k
          );
        }).map((task, idx) => ({
          title: task,
          priority: priorities[idx],
          category: categories[idx],
        }));
    
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
          <View key={index} style={styles.taskContainer}>
            <Text style={styles.taskTitle}>
              {task.title}, Priority: {task.priority}, Category: {task.category}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};



const VerticalCalendar = ({ route }) => {
  const { tasks, taskDates, priorities, categories } = route.params;
  const days = generateDays(7, tasks, taskDates, priorities, categories); // display up to 7 days


  return (
    <ScrollView>
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