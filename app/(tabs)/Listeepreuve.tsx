import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image } from 'react-native';

import {
    Dimensions,
    FlatList,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Epreuve {
  id: number;
  nom: string;
  lieu: string;
  date: string;
}

const data: Epreuve[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  nom: 'nomépreuve',
  lieu: 'Lyon',
  date: '28/04/25',
}));

const ListeEpreuves: React.FC = () => {
  const renderItem = ({ item }: { item: Epreuve }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.nom}</Text>
      <Text style={styles.cell}>{item.lieu}</Text>
      <Text style={styles.cell}>{item.date}</Text>
    </View>
  );

  return (
    
    <SafeAreaView style={styles.container}>
     {/* Header */}
        <View style={styles.header}>
            <Image
                source={require('../../assets/Logo32.png')} 
                style={styles.logo}
                resizeMode="contain"
            />
            <Ionicons name="person-circle-outline" size={28} color="white" />
        </View>
      <ImageBackground
        source={require('../../assets/horse.png')}
        style={styles.banner}
        resizeMode="cover"
      >
        <Text style={styles.bannerText}>LISTE DES ÉPREUVES</Text>
      </ImageBackground>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.table}
      />
    </SafeAreaView>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  avatar: {
    width: 25,
    height: 25,
    backgroundColor: '#fff',
    borderRadius: 12.5,
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
  table: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
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
});

export default ListeEpreuves;
