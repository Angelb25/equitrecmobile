import { router } from 'expo-router';
import React from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const ConnexionRapideScreen = () => {
  const gotoqrcode = () => {
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
        <Button title='Scanner un QR Code' onPress={gotoqrcode} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5c5c5c',
  },
  header: {
    height: 60,
    backgroundColor: '#d4aa2f',
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
});

export default ConnexionRapideScreen;
