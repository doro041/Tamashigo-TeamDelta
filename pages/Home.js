import react from 'react';
import {View, Text, ImageBackground, ScrollView, TextInput} from 'react-native';

export default function Dashboard({ navigation }) {
    return (
      <Background>
       
        <Header>Let’s start</Header>
        <Paragraph>
          Your amazing app starts here. Open you favorite code editor and start
          editing this project.
        </Paragraph>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
          Logout
        </Button>
      </Background>
    )
  }
  