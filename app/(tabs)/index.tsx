import { router } from 'expo-router';
import React from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ConnexionRapideScreen = () => {
  const gotoqrcode = () => {
    // Navigation logic to QR code scanner
    console.log('Navigating to QR Code Scanner...');
    router.push('/screen_free/qrcode/scan');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/Logo32.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Connexion rapide</Text>
        <Text style={styles.subtitle}>Scannez le QR Code pour vous connecter</Text>
        <Button title='Scanner un QR Code' onPress={() => {gotoqrcode()}} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Scanner un QR Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5c5c5c', // Gris foncé
  },
  header: {
    height: 60,
    backgroundColor: '#d4aa2f', // Bandeau jaune
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 40,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#cbd9ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default ConnexionRapideScreen;
