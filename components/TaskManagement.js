import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, FlatList } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';


const TaskManagement = () => {
    
    const [taskVisible, setTaskVisible] = useState(false);
    const [taskChoiceVisible, setTaskChoiceVisible] = useState(false);

    const [TASKARRAY, setTaskArray] = useState([]);
    const [name, setName] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [time, setTime] = useState("");

    const addTask = () => {
        setTaskChoiceVisible(!taskChoiceVisible);
        const newTask = [
            name, priority, category, time,
        ];
        setTaskArray([...TASKARRAY, newTask]);
    }
    return (
        <View style={styles.container}>
            <View style={styles.taskContent}>
                <Modal animationType="slide" transparent={true} visible={taskVisible}>
                    <View style={styles.task}>
                        <ScrollView>
                            <Pressable onPress={() => setTaskChoiceVisible(true)}>
                                <FlatList data={TASKARRAY} keyExtractor={(item, index) => index.toString()}
                                    renderItem={(taskArray) => {
                                        return (
                                            <View style={styles.listItem}>
                                                <Text>{taskArray.item}</Text>
                                            </View>
                                        );//need to add a delete button
                                    }} />
                                <Text>Add Tasks</Text>
                            </Pressable>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setTaskVisible(!taskVisible)} style={{ paddingTop: 15, }}>Cancel</TouchableOpacity>
                    </View>
                </Modal>
                <Modal animationType="slide" transparent={true} visible={taskChoiceVisible}>
                    <View style={styles.taskChoice}>
                        <View style={styles.taskOption}>
                            <View>
                                <Text>Task</Text>
                                <TextInput placeholder='Name your Task!' onChangeText={text => setName(text)}
                                    style={styles.button}></TextInput>
                                <View style={styles.priority}>
                                    <Text>Priority</Text>
                                    <Pressable onPress={() => setPriority("Small")} style={styles.button}>Small</Pressable>
                                    <Pressable onPress={() => setPriority("Medium")} style={styles.button}>Medium</Pressable>
                                    <Pressable onPress={() => setPriority("High")} style={styles.button}>High</Pressable>
                                </View>
                                <View style={styles.category}>
                                    <Pressable onPress={() => setCategory("Productivity")}>Productivity</Pressable>
                                    <Pressable onPress={() => setCategory("Health")} >Health</Pressable>
                                    <Pressable onPress={() => setCategory("Finance")} >Finance</Pressable>
                                    <Pressable onPress={() => setCategory("Hobbies")} >Hobbies</Pressable>
                                    <Text>Category</Text>
                                </View>
                                <View style={styles.time}>
                                    <Text style={{ paddingRight: 5, }}>Timer</Text>
                                    <Pressable onPress={() => setTime("ShortBreak")} style={styles.button}>Short Break</Pressable>
                                    <Pressable onPress={() => setCategory("LongBreak")} style={styles.button}>Long Break</Pressable>
                                    <Pressable onPress={() => setCategory("Focus")} style={styles.button}>Focus</Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={() => setTaskChoiceVisible(!taskChoiceVisible)} style={{ paddingRight: 10 }}>Cancel</TouchableOpacity>
                            <TouchableOpacity onPress={addTask} style={{ paddingLeft: 10 }}>Save</TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                <Pressable onPress={() => setTaskVisible(true)} style={styles.mainBar}>
                    <Text> Tasks</Text>
                </Pressable>
            </View >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: '10%',
        right: '0%',
        padding: 20,
        borderColor: "black",
        backgroundColor: "white",
        borderRadius: "50%",
    },

    mainBar: {
        borderRadius: 20,
        width: 'auto',
        height: 'auto',
        margin: 'auto',

    },

    taskContent: {
        flex: 0.5,
        width: '25%',
        height: '25%',
    },

    task: {
        margin: 'auto',
        backgroundColor: 'white',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 25,
        borderRadius: 20,
    },

    listItem: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flex: 1,
        justifyContent: "space-evenly",
    },

    taskChoice: {
        margin: "auto",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        grid: 1,
    },

    taskOption: {
        flex: 5,
        margin: "auto",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button: {
        padding: 4,
        borderColor: 'black',
        borderWidth: 1,
        margin: 'auto',
    },

    priority: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },

    category: {
        flex: 1,
        justifyContent: 'space-between',
        flexWrap: "wrap-reverse",
        padding: 5,
    },

    time: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap-reverse",
        padding: 5,
    },

    option: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default TaskManagement;