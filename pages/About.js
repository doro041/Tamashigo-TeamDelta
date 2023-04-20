import * as React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const About = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <Image
          source={require('./assets/picture.jpeg')}
          style={styles.photo}
        /> */}
        <Text style={styles.title}>Welcome to Tamashigo!</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Our Story</Text>
          <View style={styles.block}>
            <Text style={styles.text}>
              We are a team of six Computer Science students who are passionate about bringing positive change into people's lives. 
              Our mission is to help people manage their lives and make them easier through our gamified to-do application, Tamashigo.
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Our Features</Text>
          <View style={styles.block}>
            <Text style={styles.text}>
              Tamashigo is similar to the Japanese Tamagotchi, but as a panda as our pet, representing a friendly and supportive companion for users in their daily life. In order to earn coins, you have to complete tasks in either of four categories: Productivity, Health, Finance and Hobbies. Those coins can be used to progress through the game and unlock accessoaries to make your panda look more unique. Additionally, we have introduced a Pomodoro method that helps people break down their work into manageable intervals followed by a short break.
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Our Team</Text>
          <View style={styles.team}>
            <View style={styles.profile}>
              {/* <Image
                source={require('./assets/picture.jpeg')}
                style={styles.profilePhoto}
              /> */}
              <Text style={styles.name}>Camille Vang</Text>
            </View>
            <View style={styles.profile}>
              {/* <Image
                source={require('./assets/picture.jpeg')}
                style={styles.profilePhoto}
              /> */}
              <Text style={styles.name}>Doroteya Stoyanova</Text>
            </View>
            <View style={styles.profile}>
              {/* <Image
                source={require('./assets/picture.jpeg')}
                style={styles.profilePhoto}
              /> */}
              <Text style={styles.name}>Kirsty Ross</Text>
            </View>
            <View style={styles.profile}>
              {/* <Image
                source={require('./assets/picture.jpeg')}
                style={styles.profilePhoto}
              /> */}
              <Text style={styles.name}>Margarita Radeva</Text>
            </View>
            <View style={styles.profile}>
              {/* <Image
                source={require('./assets/picture.jpeg')}
                style={styles.profilePhoto}
              /> */}
              <Text style={styles.name}>Julien Acker</Text>
            </View>
            <View style={styles.profile}>
              {/* <Image
                source={require('./assets/picture.jpeg')}
                style={styles.profilePhoto}
              /> */}
              <Text style={styles.name}>Zahary Kwidzynski</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Contact Us</Text>
          <View style={styles.block}>
            <Text style={styles.text}>
              We are excited to share Tamashigo with you and hope that it will help you lead a more productive and fulfilling life. Please feel free to contact us with any questions or feedback you may have.
            </Text>
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF5E5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#3F484A',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    color: '#3F484A',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
  },
  text: {
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#3F484A',
    lineHeight: 30,
  },
  section: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  block: {
    marginTop: 20,
  },
  team: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },
  profile: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#3F484A',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
  },

    });

    export default About;