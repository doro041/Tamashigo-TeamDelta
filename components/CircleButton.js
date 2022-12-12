import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

const CircleButton = ({ onPress, size, color }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    justifyContent: 'flex-end',
                    //move the button to the bottom of the screen  
                    position: 'absolute',
                    bottom: 10,
                    right: 40,

                    alignItems: 'center',

                }}
            >
                 {/* Add some padding to the button */}
                 <View style={{ padding: 10 }}>
                  {/* Display a plus sign in the button */}
                  <Text style={{ color: 'white' ,fontSize:20}}>+</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Add type annotations to the props

CircleButton.propTypes = {
  onPress: PropTypes.func.isRequired, // The onPress prop must be a function
  size: PropTypes.number, // The size prop must be a number
  color: PropTypes.string, // The color prop must be a string
};

CircleButton.defaultProps = {
  size: 50, // default size
  color: '#000', // black

};

export default CircleButton;

