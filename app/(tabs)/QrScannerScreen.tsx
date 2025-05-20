import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onClose: () => void; // Pour fermer le scanner
};

const QrScannerScreen: React.FC<Props> = ({ onClose }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    alert(`QR Code scanné : ${data}`);
    // Fermer automatiquement après 2s (optionnel)
    setTimeout(() => {
      setScanned(false);
      onClose();
    }, 2000);
  };

  if (hasPermission === null) {
    return <Text>Demande d'autorisation de la caméra...</Text>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>Accès caméra refusé</Text>
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Text style={styles.info}>QR Code détecté</Text>
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
            <Text style={styles.buttonText}>Scanner à nouveau</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity onPress={onClose} style={styles.backButton}>
        <Text style={styles.buttonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QrScannerScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 8,
  },
});
