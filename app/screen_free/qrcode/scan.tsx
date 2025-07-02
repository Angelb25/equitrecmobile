import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function TabTwoScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [qrContent, setQrContent] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);

  const router = useRouter();

  // Demande permission caméra
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setShowScanner(false);

    try {
      let token = data;

      // Tente de parser le contenu comme JSON
      if (data.trim().startsWith('{')) {
        const parsed = JSON.parse(data);
        if (parsed.token) {
          token = parsed.token;
        } else {
          throw new Error("Le QR code JSON ne contient pas de clé 'token'.");
        }
      }

      setQrContent(token);
      console.log('Token scanné :', token);

      // Redirection vers la page Listeepreuve
      setTimeout(() => {
        router.push('/Listeepreuve');
      }, 300);

    } catch (error) {
      console.error("Erreur lors du scan du QR code :", error);
      Alert.alert("QR code invalide", "Le contenu du QR code est incorrect.");
    }
  };

  if (hasPermission === null) return <Text>Demande de permission caméra...</Text>;
  if (hasPermission === false) return <Text>Accès caméra refusé</Text>;

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
          <Text style={styles.subtitle}>Token scanné :</Text>
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
  section: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '500',
  },
  qrContent: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
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
});
