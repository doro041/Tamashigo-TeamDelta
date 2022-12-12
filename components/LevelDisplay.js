import React, { Component } from 'react';
import { View, Text } from 'react-native';

class App extends Component {
  // Initialize the state with a starting level of 1
  state = {
    level: 1,
  };

  // Method to increase the level by a specified amount
  increaseLevel = (amount) => {
    this.setState((prevState) => ({
      level: prevState.level + amount,
    }));
  }

  // Method to decrease the level by a specified amount
  decreaseLevel = (amount) => {
    this.setState((prevState) => ({
      level: prevState.level - amount,
    }));
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* Create a container for the level bar using the View component */}
        <View style={{ width: 200, height: 50, backgroundColor: '#333' }}>
          {/* Display the level text inside the level bar container */}
          <Text style={{ color: 'white', fontSize: 20 }}>
            Level: {this.state.level}
          </Text>
        </View>
      </View>
    );
  }
}

export default App;