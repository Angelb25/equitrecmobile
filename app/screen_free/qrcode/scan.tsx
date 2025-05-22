import { Camera, CameraView } from 'expo-camera';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function TabTwoScreen() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);

type OpenURLButtonProps = {
  url: string;
  children: string;
};

useEffect(() => {
const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
};
getCameraPermissions();
}, []);

// fonction pour appel api
const fetchData = async () => {
  setLoading(true);
  try {
    const response = await fetch('');
    const json = await response.json();
    setData(json);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchData();
}, []);

const handlePress = async (url) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Impossible d'ouvrir l'URL : ${url}`);
  }
};

const handleBarCodeScanned = ({ data }) => {
setScanned(true);
setQrContent(data);
setShowScanner(false);
handlePress(data);
};

if (hasPermission === null) {
    return <Text>Demande de permission caméra...</Text>;
}
if (hasPermission === false) {
    return <Text>Accès caméra refusé</Text>;
}

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.section}>
      <Button
        title={showScanner ? 'Fermer le scanner' : 'Scanner un QR Code'}
        onPress={() => {
          setShowScanner(!showScanner);
          setScanned(false);
          setQrContent(null);
        }}
      />
    </View>

{showScanner && (
  <View style={styles.cameraContainer}>
    <CameraView
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
      style={styles.camera}
    />
  </View>
)}
    {qrContent && (
      <View style={styles.section}>
        <Text style={styles.subtitle}>Contenu du QR Code :</Text>
        <Text style={styles.qrContent}>{qrContent}</Text>
      </View>
    )}
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 15,
    borderRadius: 8,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: windowWidth - 40,
    height: windowWidth - 40,
    borderRadius: 12,
    marginTop: 10,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    borderRadius: 16,
    marginVertical: 20,
  },
  camera: {
    flex: 1,
  },
  qrContent: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    marginTop: 10,
  },
});
