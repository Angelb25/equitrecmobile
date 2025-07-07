import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView, StyleSheet, Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const FicheNotationScreen = () => {
  const { dossard, epreuve } = useLocalSearchParams();
  const router = useRouter();

  const [contrat, setContrat] = useState('');
  const [allure, setAllure] = useState('');
  const [observation, setObservation] = useState('');
  const [notationsList, setNotationsList] = useState([]);
  const [penalites, setPenalites] = useState({
    piedSorti: false,
    brutalite: false,
    franchissementDangereux: false,
  });

  const [nomJuge, setNomJuge] = useState('');
  const [cavalierId, setCavalierId] = useState(null);
  const [epreuveId, setEpreuveId] = useState(null);
  const [niveauId, setNiveauId] = useState(null);

  useEffect(() => {
    fetch('http://100.85.16.81:3000/qrcode/getCompetitionDataFromToken?token=55')
      .then((res) => res.json())
      .then((json) => {
        // 🔹 Nom du juge
        let surename = '';
        if (json?.epreuves && epreuve) {
          const epreuveData = json.epreuves.find((e) => e.nom === epreuve);
          if (epreuveData?.juge?.surename) {
            surename = epreuveData.juge.surename;
          }
          if (epreuveData?.id) {
            setEpreuveId(epreuveData.id);
          }
        }

        if (!surename && json?.juge?.surename) {
          surename = json.juge.surename;
        }
        setNomJuge(surename);

        // 🔹 Récupération du cavalier_id et niveau_id via dossard
        if (json?.cavaliers && dossard) {
          const cavalier = json.cavaliers.find(c => c.dossard === Number(dossard));
          if (cavalier) {
            setCavalierId(cavalier.cavalier_id);
            setNiveauId(cavalier.niveau_id); // ✅ ici on récupère niveau_id
          }
        }
      })
      .catch(() => {
        setNomJuge('');
      });
  }, [epreuve, dossard]);

  const getContratPoints = () => {
    switch (contrat) {
      case 'réalisé': return 7;
      case '1 faute': return 4;
      case '2 fautes': return 1;
      case '3 fautes': return 0;
      default: return 0;
    }
  };

  const getAllurePoints = () => {
    return allure === 'galop' ? 3 : allure === 'trot' ? -2 : 0;
  };

  const getPenalitesPoints = () => {
    let total = 0;
    if (penalites.piedSorti) total -= 10;
    if (penalites.brutalite) total -= 10;
    if (penalites.franchissementDangereux) total -= 10;
    return total;
  };

  const renderCheckbox = (selectedValue, setValue, label, value) => (
    <TouchableOpacity
      style={styles.checkboxRow}
      onPress={() => setValue(value)}
    >
      <View style={[
        styles.checkbox,
        selectedValue === value && styles.checkboxChecked,
      ]} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const handleSave = () => {
    const newNotation = {
      epreuve_id: epreuveId,
      niveau_id: niveauId,
      cavaliers: [
        {
          cavalier_id: cavalierId,
          allure: getAllurePoints(),
          penalite: getPenalitesPoints(),
          contrat: getContratPoints(),
          total: getContratPoints() + getAllurePoints() + getPenalitesPoints(),
          style: 0,
          Observations: observation,
        },
      ],
    };

    const updatedList = [...notationsList, newNotation];
    setNotationsList(updatedList);

    const payload = {
      notations: updatedList,
    };

    console.log('sauvegarde:', JSON.stringify(payload, null, 2));
    AsyncStorage.setItem('notations', JSON.stringify(payload))
      .then(() => {
        console.log('Notations sauvegardées avec succès');
      })
      .catch((error) => {
        console.error('Erreur lors de la sauvegarde des notations:', error);
      });
    router.push('/(tabs)/Listeepreuve');
  };

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
          <Text style={styles.titleText}>Fiche notation</Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={true}>
        <Text style={styles.name}>
          Dossard : {dossard || '-'} | Épreuve : {epreuve || '-'}
        </Text>

        <Text style={{ textAlign: 'center', fontSize: 14, marginBottom: 10 }}>
          Cavalier ID : {cavalierId ?? 'Non trouvé'} | Niveau ID : {niveauId ?? 'Non trouvé'}
        </Text>

        <Text style={styles.sectionTitle}>Contrat</Text>
        {renderCheckbox(contrat, setContrat, 'Réalisé', 'réalisé')}
        {renderCheckbox(contrat, setContrat, '1 faute', '1 faute')}
        {renderCheckbox(contrat, setContrat, '2 fautes', '2 fautes')}
        {renderCheckbox(contrat, setContrat, '3 fautes', '3 fautes')}
        <Text style={styles.totalText}>Total C: {getContratPoints()}</Text>

        <Text style={styles.sectionTitle}>Allures</Text>
        {renderCheckbox(allure, setAllure, 'Galop', 'galop')}
        {renderCheckbox(allure, setAllure, 'Trot', 'trot')}
        <Text style={styles.totalText}>Total A: {getAllurePoints()}</Text>

        <Text style={styles.sectionTitle}>Pénalités</Text>
        {[{ key: 'piedSorti', label: 'Pied sorti du couloir' },
          { key: 'brutalite', label: 'Brutalité' },
          { key: 'franchissementDangereux', label: 'Franchissement dangereux' },
        ].map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={styles.checkboxRow}
            onPress={() =>
              setPenalites((prev) => ({ ...prev, [key]: !prev[key] }))
            }
          >
            <View style={[
              styles.checkbox,
              penalites[key] && styles.checkboxChecked,
            ]} />
            <Text style={styles.checkboxLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.totalText}>Total P: {getPenalitesPoints()}</Text>

        <Text style={styles.sectionTitle}>Observations</Text>
        <TextInput
          value={observation}
          onChangeText={setObservation}
          placeholder="Ajouter une observation"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 6,
            padding: 10,
            marginBottom: 16,
          }}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FicheNotationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 60,
    backgroundColor: '#d4aa2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    position: 'relative',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -16 }],
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
  form: { padding: 16 },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#ccb157',
    borderColor: '#a88e3a',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
  },
  totalText: {
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 8,
    fontSize: 15,
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: '#ccb157',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
