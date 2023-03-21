import React, { useState } from 'react';
import { Pressable, Modal, FlatList } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

//USE FLATLIST

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
                <Modal transparent={true} visible={taskVisible}>
                    <View style={styles.task}>
                        <ScrollView>
                            <Pressable onPress={() => setTaskChoiceVisible(true)} style={styles.mainBar}>
                                <FlatList data={TASKARRAY} keyExtractor={(item, index) => index.toString()}
                                    renderItem={(taskArray) => {
                                        return (
                                            <View style={styles.listItem}>
                                                <Text>{taskArray.item}</Text>
                                            </View>
                                        );
                                    }} />
                                <Text>Add Tasks</Text>
                            </Pressable>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setTaskVisible(!taskVisible)}>Cancel</TouchableOpacity>
                    </View>
                </Modal>
                <Modal transparent={true} visible={taskChoiceVisible}>
                    <View style={styles.taskChoice}>
                        <View style={styles.taskOption}>
                            <View style={styles.textTask}>
                                <Text>Task</Text>
                                <Text>Priority</Text>
                                <Text>Category</Text>
                                <Text>Timer</Text>
                            </View>
                            <View>
                                <TextInput placeholder='Name your Task!' onChangeText={text => setName(text)}></TextInput>
                                <View style={styles.priority}>
                                    <TouchableOpacity onPress={() => setPriority("Small")}>Small</TouchableOpacity>
                                    <TouchableOpacity onPress={() => setPriority("Medium")}>Medium</TouchableOpacity>
                                    <TouchableOpacity onPress={() => setPriority("High")}>High</TouchableOpacity>
                                </View>
                                <View style={styles.category}>
                                    <TouchableOpacity onPress={() => setCategory("Productivity")}>Productivity</TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCategory("Health")}>Health</TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCategory("Finance")}>Finance</TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCategory("Hobbies")}>Hobbies</TouchableOpacity>
                                </View>
                                <View style={styles.time}>
                                    <TouchableOpacity onPress={() => setTime("ShortBreak")}>Short Break</TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCategory("LongBreak")}>Long Break</TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCategory("Focus")}>Focus</TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <TouchableOpacity onPress={() => setTaskChoiceVisible(!taskChoiceVisible)}>Cancel</TouchableOpacity>
                            <TouchableOpacity onPress={addTask}>Save</TouchableOpacity>
                        </View>
                    </View>

                </Modal>
                <Pressable onPress={() => setTaskVisible(true)} style={styles.mainBar}>
                    <Text style={styles.mainBar}> Tasks</Text>
                </Pressable>
            </View >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 1,
        left: '50%',
        right: '50%',
        padding: 20,
        width: "30%",
    },

    mainBar: {
        borderRadius: 20,
        borderColor: "black",
        backgroundColor: "white",
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
    },

    taskChoice: {
        margin: "auto",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    taskOption: {
        flex: 5,
        flexDirection: 'row',
    },

    priority: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    category: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    time: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    option: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
});

export default TaskManagement;