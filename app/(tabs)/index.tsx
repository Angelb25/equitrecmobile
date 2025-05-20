import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QrScannerScreen from './QrScannerScreen'; // <-- importer le composant

export default function QuickLoginScreen() {
  const [showScanner, setShowScanner] = useState(false);

  if (showScanner) {
    return <QrScannerScreen onClose={() => setShowScanner(false)} />;
  }

  return (
    <View style={styles.background}>
      <BlurView intensity={50} tint="light" style={styles.blurContainer}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/Logo32.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Ionicons name="person-circle-outline" size={28} color="white" />
          </View>

          {/* Contenu principal */}
          <View style={styles.content}>
            <Text style={styles.title}>Connexion rapide</Text>
            <Text style={styles.subtitle}>Scannez le QR Code pour vous connecter</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowScanner(true)}
            >
              <Text style={styles.buttonText}>Scanner un QR Code</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#333333' },
  blurContainer: { flex: 1 },
  container: { flex: 1 },
  header: {
    backgroundColor: '#E4A100',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { width: 32, height: 32 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F3F3F3',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});
