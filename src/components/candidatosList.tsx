import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';

type Candidato = {
  id: string;
  nome: string;
  email: string;
};

type CandidatosListProps = {
  candidatos: Candidato[];
};

const CandidatosList: React.FC<CandidatosListProps> = ({ candidatos }) => {
  const renderItem = ({ item }: { item: Candidato }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }} 
        style={styles.avatar}
      />
      <View>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={candidatos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View>
          <Pressable onPress={() => router.replace('/empresa/(tabs)/home')}
            style={{ bottom: 15,}}>
            <FontAwesome name="arrow-left" color="white" size={20} />
          </Pressable>
       
          <Text style={styles.titulo}>Perfis ({candidatos.length})</Text>
          <Text style={styles.subtitulo}>Engineer Software</Text>
        </View>
      }
      contentContainerStyle={styles.container}
  
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    top: 34,
  },
  subtitulo: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8800FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginRight: 15,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  more: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CandidatosList;
