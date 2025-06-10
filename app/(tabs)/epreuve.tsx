import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Liste de dossards
const dossards = [
  { id: "1111" }, { id: "1112" }, { id: "1113" }, { id: "1114" },
  { id: "1115" }, { id: "1116" }, { id: "1117" }, { id: "1118" },
  { id: "1119" },
];

export default function EpreuveScreen() {
  const [selectedId, setSelectedId] = useState(null);

  const handlePress = (id) => {
    setSelectedId(id);
    console.log("Dossard cliqué :", id);
  };

  return (
    
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
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
      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titre}>nomepreuve</Text>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardDate}>29/04/25{"\n"}Lyon</Text>
          </View>
        </View>

        {/* Grille de dossards */}
        <View style={styles.grid}>
          {dossards.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.dossard,
                  isSelected && styles.dossardSelected,
                ]}
                onPress={() => handlePress(item.id)}
              >
                <Text style={styles.dossardText}>{item.id}</Text>
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
  heroImage: { width: "100%", height: 200 },
  heroText: {
    position: "absolute",
    top: 160,
    alignSelf: "center",
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
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

  // Grille de dossards
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

});
