import React, { useState, useEffect } from 'react';
import { ScrollView , Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Button} from 'react-native';
import Timer from './Timer';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons, Entypo } from 'react-native-vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import TaskItem from './TaskItem'; // Import the TaskItem component
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarModal from './CalendarModal';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Todo = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [deadline, setDeadline] = useState(new Date());
  const [deadlines, setDeadlines] = useState([]); // Array of deadlines
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [valueList, setValueList] = useState([]);
  const categories = ["Productivity", "Health", "Finances", "Hobbies"];
  const priorities = ["Low", "Medium", "High", "ASAP"];
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(taskItems.map((_, index) => index)); // Create a new state for filtered tasks
  const handleSelectCategory = (item) => {
    setSelectedCategory(item);
  };


  

  const filterTasks = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setFilteredTasks(taskItems.map((_, index) => index));
    } else {
      setSelectedCategory(category);
      const newFilteredTasks = taskItems
        .map((_, index) => index)
        .filter((index) => categoriesList[index] === category);
      setFilteredTasks(newFilteredTasks);
    }
  };
  
 
  
  

  const handleSelectPriority = (item) => {
    console.log(item)
    setSelectedPriority(item);
  };

  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    filterTasks(selectedCategory);
  }, [taskItems]);
  const storeData = async (key, value) => {
    try {
      console.log('Storing data:', key, value)
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const storedTaskItems = await AsyncStorage.getItem("taskItems");
      const storedValueList = await AsyncStorage.getItem("valueList");
      const storedCategoriesList = await AsyncStorage.getItem("categoriesList");
      const storedDeadlines = await AsyncStorage.getItem("deadlines");
  
      let parsedTaskItems = [];
      let parsedValueList = [];
      let parsedCategoriesList = [];
      let parsedDeadlines = [];
  
      if (storedTaskItems) {
        parsedTaskItems = JSON.parse(storedTaskItems);
      }
  
      if (storedValueList) {
        parsedValueList = JSON.parse(storedValueList);
      } else {
        console.warn('No value list found');}
  
      if (storedCategoriesList) {
        parsedCategoriesList = JSON.parse(storedCategoriesList);
      }
  
      if (storedDeadlines) {
        parsedDeadlines = JSON.parse(storedDeadlines).map(dateString => new Date(dateString));
      }
      console.log('Loaded data:', parsedTaskItems, parsedValueList, parsedCategoriesList, parsedDeadlines)
      setDeadlines(parsedDeadlines);
      setTaskItems(parsedTaskItems);
      setValueList(parsedValueList);
      setCategoriesList(parsedCategoriesList);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

const priorityValues= [
  {index: 0, label: priorities[0], value: <MaterialCommunityIcons name="snail" size={24} color="black" />}, 
    {index: 1, label: priorities[1], value: <Feather name="alert-circle" size={24} color="black" />},
    {index: 2, label: priorities[2],  value: <FontAwesome name="exclamation-triangle" size={24} color="black" />},
    {index: 3, label: priorities[3],value:<Feather name="zap" size={24} color="black" /> }
];

const selectedCategoryColors = { // dictactes the colour of each task based on the category assigned to it
  'Productivity': '#dce4ef',
  'Health': '#94bfa2',
  'Finances': '#fad980',
  'Hobbies': '#f9dede',

}

const handleAddTask = async () => {
  Keyboard.dismiss();
  if (!task.trim() || selectedCategory == null || selectedPriority == null) {
    return;
  }
  const newTaskItems = [...taskItems, task];
  const newValueList = [...valueList, selectedPriority.index]; // Save the index instead of the value
  const newCategoriesList = [...categoriesList, selectedCategory];
  const newDeadlines = [...deadlines, new Date(deadline)];
  setDeadlines(newDeadlines);
  setTaskItems(newTaskItems);
  setValueList(newValueList);
  setCategoriesList(newCategoriesList);

  storeData('deadlines', newDeadlines);
  storeData('taskItems', newTaskItems);
  storeData('valueList', newValueList);
  storeData('categoriesList', newCategoriesList);

  try {
    await AsyncStorage.setItem('deadlines', JSON.stringify(newDeadlines.map(date => date.toISOString())));
    await AsyncStorage.setItem('taskItems', JSON.stringify(newTaskItems));
    await AsyncStorage.setItem('valueList', JSON.stringify(newValueList));
    await AsyncStorage.setItem('categoriesList', JSON.stringify(newCategoriesList));
  } catch (error) {
    console.error('Error saving data:', error);
  }

  setTask('');
  setModalVisible(false);
  setSelectedPriority(null); // Reset selected priority
  setSelectedCategory(null); // Reset selected category
};

const getFilteredTasks = () => {
  if (selectedCategory === null) {
    return taskItems;
  }

  return taskItems.filter((_, index) => filteredTasks.includes(index));
};



  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    let deadlinesCopy = [...deadlines];
    let setValueListCopy = [...valueList];
    let setCategoriesListCopy = [...categoriesList];
  
    itemsCopy.splice(index, 1);
    deadlinesCopy.splice(index, 1);
    setValueListCopy.splice(index, 1);
    setCategoriesListCopy.splice(index, 1);
  
    setTaskItems(itemsCopy);
    setDeadlines(deadlinesCopy);
    setValueList(setValueListCopy);
    setCategoriesList(setCategoriesListCopy);
  
    storeData('taskItems', itemsCopy);
    storeData('deadlines', deadlinesCopy);
    storeData('valueList', setValueListCopy);
    storeData('categoriesList', setCategoriesListCopy);
  
    filterTasks(selectedCategory);
  };
  
  

    
 
  return (
   
    <View style={styles.container}>
      {/* Today's tasks */}
      
      <Modal  

        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          
        }}>
          <View style={styles.overlay}>

          {/* <ScrollView> */}
        <View style={styles.modalContainer}>
        <View style={{flexDirection: 'row'}}>

         <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
         
        
         <CalendarModal visible={showCalendar} setVisible={setShowCalendar} setDeadline={setDeadline} />
          <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Feather name="calendar" size={36} color="black" style={{marginLeft: 10}} />
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center'}}>

        <SelectDropdown
  defaultButtonText='Select a Priority'
  data={priorityValues}
  onSelect={handleSelectPriority}
  buttonTextAfterSelection={(selectedItem) => {
    return selectedItem.label;
  }}
  rowTextForSelection={(item) => {
    return item.label;
  }}
  renderDropdownIcon={() => (
    <MaterialIcons name='arrow-drop-down' size={24} color='#78B1C3' />
  )}
  dropdownStyle={{
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 250,
  }}
  buttonStyle={{
    backgroundColor: '#e7f4e4',
    borderWidth: 2,
    borderColor: '#94bfa2',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  buttonTextStyle={{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B6623',
    textAlign: 'center',
    textTransform: 'capitalize',
  }}
/>

<SelectDropdown
  defaultButtonText='Select a category'
  data={categories}
  onSelect={handleSelectCategory}
  buttonTextAfterSelection={(selectedItem) => {
      // text represented after item is selected
      return selectedItem
  }}
  rowTextForSelection={(item) => {
      // text represented for each item in dropdown
      return item
  }}
  renderDropdownIcon={() => (
    <MaterialIcons name='arrow-drop-down' size={24} color='#78B1C3' />
  )}
  renderCustomizedRowChild={(item, index) => (
    <View style={{
      backgroundColor: selectedCategoryColors[item],
      padding: 10,
      borderRadius: 10,
    }}>
      <Text style={{color: 'black', fontSize: 16}}>{item}</Text>
    </View>
  )}
  dropdownStyle={{
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 250,
  }}
  buttonStyle={{
    backgroundColor: '#e7f4e4',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#94bfa2',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  }}
  buttonTextStyle={{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0B6623',
    textAlign: 'center',
    textTransform: 'capitalize',
  }}
/>

        
  

      </View>        

<TouchableOpacity
  onPress={() => handleAddTask()}>
  <Entypo name="squared-plus" size={40} />
</TouchableOpacity>

        
        </View>
       

<TouchableOpacity style={styles.exitWrapper} onPress={() => {
  setTask("");
  setSelectedPriority(null); // Reset selected priority
  setSelectedCategory(null); // Reset selected category
  setModalVisible(!modalVisible);
}}>
  <Text style={styles.textStyle}>Exit</Text>
</TouchableOpacity>


        </View>
        {/* </ScrollView> */}
        </Modal>
        
        
      <View style = {styles.qualities}>
      </View>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tasksWrapper}>
        
        <Text style={styles.sectionTitle}>My Tasks</Text>
        
        <View style={{flexDirection: 'row', marginVertical: 10}}>
        <TouchableOpacity onPress={() => filterTasks('Productivity')}>
          <Text style={{ backgroundColor: '#dce4ef', color: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#abb7c7' }}>Productivity</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterTasks('Health')} style={{ marginLeft: 10 }}>
          <Text style={{ backgroundColor: '#94bfa2', color: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#688f75' }}>Health</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterTasks('Finances')} style={{ marginLeft: 10 }}>
          <Text style={{ backgroundColor: '#fad980', color: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#c2a75d' }}>Finances</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterTasks('Hobbies')} style={{ marginLeft: 10 }}>
          <Text style={{ backgroundColor: '#f9dede', color: 'black', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#d1aeae' }}>Hobbies</Text>
        </TouchableOpacity>
  
</View>
<View style={styles.items}>
  {/* This is where the tasks will go! */}
  {getFilteredTasks().map((item, index) => {
  const originalIndex = filteredTasks[index];

  return (
    <TaskItem
      key={originalIndex}
      task={item}
      taskDate={deadlines[originalIndex]}
      priorityIcon={priorityValues[valueList[originalIndex]]?.value || null}
      categoryColor={selectedCategoryColors[categoriesList[originalIndex]]}
      onCompleteTask={() => completeTask(originalIndex)}
    >
      <Timer deadline={deadlines[originalIndex]} />
    </TaskItem>
    
  );})}





</View>

    
      </View>
      </ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
    
     
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.addWrapper}>
          <Feather name="plus" size={24} color="#4A8AE7" />

          </View>
          
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Footer
        taskItems={taskItems}
        deadlines={deadlines}
        valueList={valueList}
        categoriesList={categoriesList}
      />


    </View>
    
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0.0, 0, 0, 0.60)',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tasksWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  items: {
    marginTop: 30,
    width: '100%',
    marginBottom: 50,

  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#e7f4e4',
    borderRadius: 60,
    borderColor: '#94bfa2',
    borderWidth: 1,
    width: 250,
    color: '#000000',
  },
  addWrapper: {
    position: 'absolute',
    bottom: -10,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignSelf: 'center',
    

  },
  addText: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',

  },
  item: {
    backgroundColor: "#A2E589",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  
  },

  qualities: {
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    
  },
  
  modalContainer: {
    flex: 1,
    marginTop: '15%',
    height: 40,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 255, 244, 0.7)', // Add a translucent background
    borderRadius: 10,
  }, 
  exitWrapper: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignSelf: 'center',
  },

  

});

export default Todo;