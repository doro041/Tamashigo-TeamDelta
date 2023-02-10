import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? 'black' : 'white' }}>
      <Text style={{ fontSize: 18,fontColor: isDarkMode? '#fff' : '#333' }}>Dark Mode</Text>
      <Switch
        value={isDarkMode}
        onValueChange={() => setIsDarkMode(!isDarkMode)}
      />
    </View>
  );
};

export default Settings;