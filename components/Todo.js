
import { View, Text, TextInput, Button, Picker } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#b4848a',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  todoInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 16,
    marginRight: 10,
  },
  circleButton: {
    position: 'absolute',
    bottom: 50,
    right : 50,
    alignSelf: 'flex-end',

  },


});


const Todo = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    const newTodoItem = {
      text: newTodo,
      completed: false,
    };
    setTodoItems([...todoItems, newTodoItem]);
    setNewTodo('');


  };

  const deleteTodo = (index) => {
    // Create a new array with the item at the given index removed
    const newTodoItems = [...todoItems.slice(0, index), ...todoItems.slice(index + 1)];
    // Update the todoItems state with the new array
    setTodoItems(newTodoItems);
  };
  

  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <TextInput
        style={styles.todoInput}
        placeholder="Feed Tamashigo"
        value={newTodo}
        color="#000"
        onChangeText={text => setNewTodo(text)}

      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}/>
      <Button onPress={addTodo} color = "black" icon="add" title="Add" />
      <Button onPress={() => deleteTodo(index)} color = "red" icon="delete" title="Delete" />
   

{todoItems.map((item, index) => (
    <View key={index} style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      
      
      <Button onPress={() => deleteTodo(index)} color = "red" icon="delete" title="Delete" />
    </View>
   
  
  ))}
    


</View>

  );
};
export default Todo ;

