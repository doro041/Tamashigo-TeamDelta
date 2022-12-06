import React from 'react';
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
                }}
            >
                <Text>Button</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CircleButton;
