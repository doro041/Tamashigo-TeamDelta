import { useState } from 'react';
import { StyleSheet, View, Image, Modal,  Text, TouchableOpacity } from 'react-native';

import AdultPanda from './AdultPanda';

const LevelUpModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLevelUp = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLevelUp}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/Panda.png')} style={styles.panda} />
          <Image source={require('../assets/bigpanda.png')} style={styles.surprise} />
        </View>
        <Text style={styles.title}>Congratulations! You leveled up!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLevelUp} style={styles.levelUpButton}>
        <Text style={styles.buttonText}>Level Up</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.subtitle}>Your pet has grown up!</Text>
           <AdultPanda />

          <TouchableOpacity onPress={handleModalClose} style={styles.closeButton}>
            <Text style={styles.buttonTextC}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  panda: {
    width: 180,
    height: 75,
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
  },
  surprise: {
    height: 50,
    width: 55,
    marginTop: 10,
  },
  levelUpButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 30,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonTextC: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default LevelUpModal;