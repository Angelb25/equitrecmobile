
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Cavalier {
  cavalier_id: number;
  nom: string;
  dossard: number;
  niveau: string;
}

interface Competition {
  nom: string;
  date: string;
  location: string;
}

interface Epreuve {
  nom: string;
  description: string;
  materiels: string;
}

interface ApiResponse {
  competition: Competition;
  cavaliers: Cavalier[];
  epreuves: Epreuve[];
}

export default function EpreuveScreen() {
  const { nom } = useLocalSearchParams();
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [epreuve, setEpreuve] = useState<Epreuve | null>(null);
  const [cavaliers, setCavaliers] = useState<Cavalier[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `http://100.85.16.81:3000/qrcode/getCompetitionDataFromToken?token=55`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((json: ApiResponse) => {
        setCompetition(json.competition);
        const found = json.epreuves.find((e) => e.nom === nom);
        if (!found) {
          setError("\u00c9preuve non trouv\u00e9e");
        } else {
          setEpreuve(found);
          setCavaliers(json.cavaliers);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handlePress = (id: number) => {
    setSelectedId(id);
    router.push({
      pathname: '/fichenotation',
      params: { dossard: id, epreuve: nom },
    });
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;
  if (error) return <Text style={styles.error}>Erreur : {error}</Text>;
  if (!competition || !epreuve) return <Text style={styles.error}>Donn\u00e9es non disponibles</Text>;

  const formattedDate = new Date(competition.date).toLocaleDateString("fr-FR");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/Logo32.png')} style={styles.logo} />
      </View>

      <ImageBackground
        source={require('../../assets/horse.png')}
        style={styles.imageHeader}
        resizeMode="cover"
      >
        <View style={styles.titleOverlay}>
          <Text style={styles.titleText}>\u00c9preuve</Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titre}>{epreuve.nom}</Text>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardDate}>
              {formattedDate}{"\n"}{competition.location}
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          {cavaliers.map((cavalier) => {
            const isSelected = selectedId === cavalier.dossard;
            return (
              <TouchableOpacity
                key={cavalier.dossard}
                style={[styles.dossard, isSelected && styles.dossardSelected]}
                onPress={() => handlePress(cavalier.dossard)}
              >
                <Text style={styles.dossardText}>{cavalier.dossard}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#ccb157",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logo: { width: 40, height: 40, resizeMode: "contain" },
  content: { padding: 16 },
  titre: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ccb157",
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
  },
  cardRow: { flexDirection: "row" },
  cardDate: { width: "100%", fontWeight: "bold" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  dossard: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbb",
  },
  dossardSelected: {
    backgroundColor: "#ccb157",
    borderColor: "#a88e3a",
  },
  dossardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
  },
});   
