import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';

export default function ApiPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

const apiUrl = 'http://100.85.16.81:3000/qrcode/getCompetitionDataFromToken?token=55';


  useEffect(() => {
    console.log('Appel API vers :', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => setError(err.message));
  }, []);

  if (error) return <Text style={styles.error}>Erreur : {error}</Text>;
  if (!data) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Résultat :</Text>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  error: { color: 'red', marginTop: 40 }
});
