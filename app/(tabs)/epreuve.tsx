import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const dossards = [
  { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" },
  { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" },
  { id: "9" }, { id: "10" },
];

export default function EpreuveScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/Logo32.png")} style={styles.logo} />
        {/* Profil icon removed */}
      </View>

      {/* Image de fond */}
      <Image source={require("../../assets/horse.png")} style={styles.heroImage} />
      <Text style={styles.heroText}>EPREUVE</Text>

      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titre}>nomepreuve</Text>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardDate}>29/04/25{"\n"}Lyon</Text>
            {/* Description removed */}
          </View>
        </View>

        {/* Grille de dossards */}
        <View style={styles.grid}>
          {dossards.map((item) => (
            <View key={item.id} style={styles.dossard}>
              <Text style={styles.dossardText}>{item.id}</Text>
            </View>
          ))}
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
  dossardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
