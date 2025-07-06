import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

const FicheNotationScreen = () => {
  const { dossard, epreuve } = useLocalSearchParams();
  const [contrat, setContrat] = useState('');
  const [allure, setAllure] = useState('');
  const [penalites, setPenalites] = useState({
    piedSorti: false,
    brutalite: false,
    franchissementDangereux: false,
  });

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

  const renderCheckbox = (selectedValue: string, setValue: (v: string) => void, label: string, value: string) => (
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


  // Récupération du nom du juge via l'API
  const [nomJuge, setNomJuge] = useState('');

  useEffect(() => {
    fetch('http://100.85.16.81:3000/qrcode/getCompetitionDataFromToken?token=55')
      .then((res) => res.json())
      .then((json) => {
        // On récupère le juge de l'épreuve sélectionnée si possible, sinon le juge global
        let surename = '';
        if (json && json.epreuves && epreuve) {
          const epreuveData = json.epreuves.find((e) => e.nom === epreuve);
          if (epreuveData && epreuveData.juge) {
            surename = epreuveData.juge.surename || '';
          }
        }
        // Fallback sur le juge global si pas trouvé dans l'épreuve
        if (!surename && json && json.juge) {
          surename = json.juge.surename || '';
        }
        setNomJuge(surename);
      })
      .catch(() => {
        setNomJuge('');
      });
  }, [epreuve]);

  // Fonction pour handle le bouton sauvegarder
  const handleSave = () => {
    // Exemple de structure, à adapter selon les vrais IDs
    const notation = {
      notations: [
        {
          epreuve_id: 5, // à remplacer par la vraie valeur si dispo
          niveau_id: 5, // à remplacer par la vraie valeur si dispo
          cavaliers: [
            {
              cavalier_id: dossard, 
              allure: allure,
              penalite: Object.keys(penalites).filter((k) => penalites[k as keyof typeof penalites]),
              contrat: getContratPoints(),
              total: getContratPoints() + getAllurePoints() + getPenalitesPoints(),
              style: 'S',
              notation_id: null,
            },
          ],
        },
      ],
    };
    console.log('JSON sauvegarde:', JSON.stringify(notation, null, 2));
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
          {/* Nom du juge en blanc et plus haut */}
          <Text style={styles.titleText}>Fiche notation</Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.form} showsVerticalScrollIndicator={true}>
        <Text style={styles.name}>Dossard : {dossard || '-'} | Épreuve : {epreuve || '-'}</Text>

        {/* CONTRAT */}
        <Text style={styles.sectionTitle}>Contrat</Text>
        {renderCheckbox(contrat, setContrat, 'Réalisé', 'réalisé')}
        {renderCheckbox(contrat, setContrat, '1 faute', '1 faute')}
        {renderCheckbox(contrat, setContrat, '2 fautes', '2 fautes')}
        {renderCheckbox(contrat, setContrat, '3 fautes', '3 fautes')}
        <Text style={styles.totalText}>Total C: {getContratPoints()}</Text>

        {/* ALLURES */}
        <Text style={styles.sectionTitle}>Allures</Text>
        {renderCheckbox(allure, setAllure, 'Galop', 'galop')}
        {renderCheckbox(allure, setAllure, 'Trot', 'trot')}
        <Text style={styles.totalText}>Total A: {getAllurePoints()}</Text>

        {/* PÉNALITÉS */}
        <Text style={styles.sectionTitle}>Pénalités</Text>
        {[
          { key: 'piedSorti', label: 'Pied sorti du couloir' },
          { key: 'brutalite', label: 'Brutalité' },
          { key: 'franchissementDangereux', label: 'Franchissement dangereux' },
        ].map(({ key, label }) => (
          <TouchableOpacity
            key={key}
            style={styles.checkboxRow}
            onPress={() =>
              setPenalites((prev) => ({ ...prev, [key]: !prev[key as keyof typeof penalites] }))
            }
          >
            <View style={[styles.checkbox, penalites[key as keyof typeof penalites] && styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.totalText}>Total P: {getPenalitesPoints()}</Text>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FicheNotationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#d4aa2f',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    position: 'relative',
  },
  judgeTextWhite: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    alignSelf: 'center',
  },
  headerSideIcon: {
    width: 40,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 20,
    color: '#000',
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
  form: {
    padding: 16,
  },
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