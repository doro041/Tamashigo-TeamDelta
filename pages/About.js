import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>
        This is the About page. Write our team's mission, purpose, and goals here alongside who we are!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
});

export default About;
