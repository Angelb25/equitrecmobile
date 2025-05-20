import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const participants = [
  { id: "1", name: "Camille Morel" },
  { id: "2", name: "Claire Dubois" },
  { id: "3", name: "Léa Fontaine" },
];

export default function EpreuveScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../../assets/Logo32.png")} style={styles.logo} />
        <Ionicons name="person-circle-outline" size={30} color="black" />
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
            <View style={styles.cardDescription}>
              <Text style={styles.cardLabel}>Descriptif :</Text>
              <Text>Ouvrir et refermer une porte{"\n"}en restant à cheval</Text>
            </View>
          </View>
        </View>

        {/* Liste des participants */}
        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.participantRow}>
              <View style={styles.participantRank}>
                <Text>{item.id}</Text>
              </View>
              <View style={styles.participantName}>
                <Text>{item.name}</Text>
              </View>
            </View>
          )}
        />
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
    justifyContent: "space-between",
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
  cardDate: { width: "35%", fontWeight: "bold" },
  cardDescription: { flex: 1 },
  cardLabel: { fontWeight: "bold" },
  participantRow: {
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#999",
    marginBottom: 2,
  },
  participantRank: {
    width: 40,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  participantName: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
    paddingLeft: 10,
  },
});
