import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    // The `value` prop on the `Switch` component indicates the
    // current value of the switch. When the user toggles the switch
    // it will trigger an `onValueChange` callback that will update
    // the `isDarkMode` state value.
    
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