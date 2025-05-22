import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const FicheNotationScreen = () => {
  const [centre, setCentre] = useState('');
  const [style, setStyle] = useState('');
  const [precision, setPrecision] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerSideIcon}>
          <Text style={styles.headerIcon}>◀</Text>
        </TouchableOpacity>

        <Image source={require('../../assets/Logo32.png')} style={styles.logo} />

      </View>

      {/* Image Header */}
      <ImageBackground
        source={require('../../assets/horse.png')}
        style={styles.imageHeader}
        resizeMode="cover"
      >
        <View style={styles.titleOverlay}>
          <Text style={styles.titleText}>Fiche notation</Text>
        </View>
      </ImageBackground>

      {/* Form content */}
      <View style={styles.form}>
        <Text style={styles.name}>Camille DUPONT</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={centre}
            onValueChange={(itemValue) => setCentre(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Oui" value="oui" />
            <Picker.Item label="Non" value="non" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={style}
            onValueChange={(itemValue) => setStyle(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Excellent" value="excellent" />
            <Picker.Item label="Correct" value="correct" />
            <Picker.Item label="Mauvais" value="mauvais" />
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={precision}
            onValueChange={(itemValue) => setPrecision(itemValue)}
            style={styles.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="" value="" />
            <Picker.Item label="Bonne" value="bonne" />
            <Picker.Item label="Moyenne" value="moyenne" />
            <Picker.Item label="Faible" value="faible" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default FicheNotationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header
  header: {
    height: 50,
    backgroundColor: '#d4aa2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'relative',
  },
  headerSideIcon: {
    width: 40,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 20,
    color: '#000',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -16 }],
  },

  // Image Header
  imageHeader: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Form
  form: {
    padding: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  pickerContainer: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#999',
    marginBottom: 15,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
    color: '#000',
  },

  // Save Button
  saveButton: {
    backgroundColor: '#d4aa2f',
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 12,
    marginTop: 30,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
