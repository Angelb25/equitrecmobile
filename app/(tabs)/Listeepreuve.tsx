import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Epreuve {
  nom: string;
  description: string;
  materiels: string;
}

const ListeEpreuves: React.FC = () => {
  const [data, setData] = useState<Epreuve[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const apiUrl = 'http://prod-project-32/api/qrcode/getCompetitionDataFromToken?token=55';
  const postUrl = 'http://prod-project-32/api/notation/getNotationFromJuge';

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Erreur serveur');
        return res.json();
      })
      .then((json) => {
        setData(json.epreuves || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleNomPress = (epreuve: Epreuve) => {
    router.push({
      pathname: '/epreuve',
      params: { nom: epreuve.nom },
    });
  };

  const handleSendToServer = async () => {
    try {
      const storedData = await AsyncStorage.getItem('notations');

      if (!storedData) {
        Alert.alert('Erreur', 'Aucune notation trouvée à envoyer.');
        return;
      }

      const jsonToSend = JSON.parse(storedData);
      console.log('Données à envoyer :', jsonToSend);
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonToSend),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l’envoi au serveur.');
      }

      const result = await response.json();
      Alert.alert('Succès', 'Les notations ont été envoyées.');
      console.log('Réponse serveur :', result);
    } catch (error) {
      Alert.alert('Erreur', (error as Error).message);
    }
  };

  const renderItem = ({ item }: { item: Epreuve }) => (
    <View style={styles.row}>
      <TouchableOpacity style={styles.cell} onPress={() => handleNomPress(item)}>
        <Text style={[styles.cell, styles.link]}>{item.nom}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>{item.materiels}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>Erreur : {error}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/Logo32.png')} style={styles.logo} resizeMode="contain" />
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </View>

      <ImageBackground source={require('../../assets/horse.png')} style={styles.banner} resizeMode="cover">
        <Text style={styles.bannerText}>LISTE DES ÉPREUVES</Text>
      </ImageBackground>

      {data.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucune épreuve disponible</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.table}
        />
      )}

      {/* BOUTON ENVOYER */}
      <View style={styles.buttonContainer}>
        <Button title="Envoyer sur le serveur" onPress={handleSendToServer} color="#ccb157" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#E4A100',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  banner: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  table: { paddingHorizontal: 10, paddingTop: 10 },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginTop: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    margin: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default ListeEpreuves;
