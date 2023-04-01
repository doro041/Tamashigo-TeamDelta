import React, { useState } from 'react';
import { ScrollView , Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from 'react-native-vector-icons';
import RadioGroup from 'react-native-radio-buttons-group';
import SelectDropdown from 'react-native-select-dropdown';




const Todo = ({navigation}) => {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [taskDate, setTaskDate] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [valueList, setValueList] = useState([]);
  const categories = ["No Category", "Productivity", "Health", "Finances", "Hobbies"];
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSelectCategory = (item) => {
    setSelectedCategory(item);
  };
  

  const [radioButtons, setRadioButtons] = useState([
    {// these are the radio buttons for each priority level
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Low',
        value: <MaterialCommunityIcons name="snail" size={24} color="black" />
    },
    {
        id: '2',
        label: 'Med',
        value: <Octicons name="primitive-dot" size={24} color="black" />
    },
    {
        id: '3',
        label: 'High',
        value: <FontAwesome name="exclamation-circle" size={24} color="black" />
    },
    {   id: '4',
        label: 'Urgent',
        value: <MaterialIcons name="priority-high" size={24} color="black" />
}
]);


const selectedCategoryColors = { // dictactes the colour of each task based on the category assigned to it
  'Productivity': '#F35907',
  'Health': '#3EA3F7',
  'Finances': '#18E340',
  'Hobbies': '#E56FFF',
  'No Category': '#B5EFE4'
}

function onPressRadioButton(radioButtonsArray) {
  // this function is called when a radio button is pressed
  const selectedButton = radioButtonsArray.find(button => button.selected === true);
  setSelectedValue(selectedButton.value);
  setRadioButtons(radioButtonsArray);
  console.log('onpressradio')
}



  const onChange = (event, selectedDate) => {
    // this function is called when the date is changed


    const currentDate = selectedDate || date; // preserve change in date choice of user
    setShow(Platform.OS === 'ios');
    setDate(currentDate); // preserve change in date choice of user
    console.log('onchange');
    
  };

  const showMode = currentMode => {
    // this function is called when the date picker is opened

    setShow(true);
    setMode(currentMode);
    console.log('showmode');
  };

  const showDatepicker = () => {
    // this function is called when the date picker is opened

    showMode('date');
    console.log('showdatepicker');
  };

  const handleAddTask = () => {
    // this function is called when a task is to be added


    Keyboard.dismiss();   // this hides the keyboard after input.
    console.log(selectedCategory)
    if (!task.trim() || selectedCategory == null) { // check if task name is empty or category is not selected
      return;}
    setTaskItems([...taskItems, task]);
    setTaskDate([...taskDate, date]);
    setValueList([...valueList, selectedValue]);
    setCategoriesList([...categoriesList, selectedCategory]);
    setTask(''); // this clears the input field
    console.log('categories: ', selectedCategory);
  };

  const completeTask = (index) => {
    // this function is called when a task is to be completed


    let itemsCopy = [...taskItems];
    let dateCopy = [...taskDate];
    let setValueListCopy = [...valueList];
    let setCategoriesListCopy = [...categoriesList];
    itemsCopy.splice(index, 1);
    dateCopy.splice(index, 1);
    setValueListCopy.splice(index, 1);
    setCategoriesListCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setTaskDate(dateCopy);
    setValueList(setValueListCopy);
    setCategoriesList(setCategoriesListCopy);
    console.log('completetask');
  };
    

 
  return (
   



    <View style={styles.container}>
      {/* Today's tasks */}
      
      <Modal  
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
         <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={{ backgroundColor: '#B5EFE4', color: 'white', padding: 10, borderRadius: 3 }}
        onPress={showDatepicker}>
        <Text> Add a date </Text>
        </TouchableOpacity> 
       

  
        <View style={{alignSelf: 'center'}}>

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
          />
          
          <Text style={{fontWeight: 'bold',fontSize: 20}}>  {/*not aligned properly */}         Priority</Text>
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
        />
        
  
        


      </View>
      
          
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}> 
          <MaterialIcons name="add-task" size={24} color="#78B1C3" />
          </View>
        </TouchableOpacity>
        
        </View>
        <Button
          title="Go to Vertical Calendar"
          onPress={() =>
          navigation.navigate('VerticalCalendar')
          }
        />
        <TouchableOpacity style={styles.addWrapper} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Exit</Text>
        
        </TouchableOpacity>
        </Modal>
        
        
      <View style = {styles.qualities}>
    
    <Text style={{ backgroundColor: '#F35907', color: 'white', padding: 10, borderRadius: 10 }}>Productivity</Text>
    <Text style={{ backgroundColor: '#3EA3F7', color: 'white', padding: 10, borderRadius: 10 }}>Health</Text>
    <Text style={{ backgroundColor: '#18E340', color: 'white', padding: 10, borderRadius: 10 }}>Finances</Text> 
    <Text style={{ backgroundColor: '#E56FFF', color: 'white', padding: 10, borderRadius: 10 }}>Hobbies</Text>
    <Ionicons name="ios-settings" size={20} color="#000" />

    </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todays tasks</Text>
        
        {show && (// this is the date picker
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {taskItems.map((item, index) => (
           
           <TouchableOpacity key={index} onPress={() => completeTask(index)}>
             <View style={[styles.item, {backgroundColor: selectedCategoryColors[categoriesList[index]]}]}>
               <View style = {styles.itemLeft}>
                 <View style = {styles.square}></View>
                 <Text style = {styles.itemText}> {item} </Text>
               </View>
               
                <Text>  {taskDate[index].toLocaleDateString()} </Text> 
               <Text>{valueList[index]} </Text>
             </View>
           </TouchableOpacity>
         ))}
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
    </View>
    
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  items: {
    marginTop: 30,
    width: '100%',
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
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
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
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default Todo;