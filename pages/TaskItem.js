import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const TaskItem = ({ task, taskDate, priorityIcon, categoryColor, onCompleteTask, children }) => {

  return (
    <TouchableOpacity key={task} onPress={onCompleteTask}>
      <View style={[styles.item, { backgroundColor: '#e7f4e4' }]}>
        <View style={[styles.line, { borderLeftColor: categoryColor }]}/>
        <View style={styles.itemContent}>
          <View style={styles.itemTop}>
            <Text style={styles.itemText}>{task}</Text>
          </View>
          <View style={styles.itemBottom}>
            <Text style={styles.taskDate}>
              {taskDate ? taskDate.toLocaleDateString() : ""}
            </Text>           
            {children}
            <Text style={styles.timer}>{priorityIcon}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#94bfa2'
  },
  line: {
    height: '100%',
    borderLeftWidth: 5,
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '80%',
  },
  itemDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaskItem;
