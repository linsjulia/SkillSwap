import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Componente principal DeveloperScreen
export default function DeveloperScreen() {
  // Lista de curriculos
  const developers = [
    'Nicole Oliveira Gonçalves',
    'Júlia Lins Pereira',
    '', '', '', '', '', // Entradas para adicionar mais nomes
  ];

  return (
    <View style={styles.neonBorder}>
      <View style={styles.container}>
   
        <TouchableOpacity style={styles.menuIcon}>
          <FontAwesome name="bars" size={24} color="#6a00ff" />
        </TouchableOpacity>

        <Text style={styles.title}>Desenvolvedor de Software</Text>

        {/* Lista rolável de curriculos */}
        <ScrollView contentContainerStyle={styles.listContainer}>
          {developers.map((name, index) => (
            <TouchableOpacity key={index} style={styles.itemContainer}>
              <Text style={styles.itemText}>{name || ' '}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <FontAwesome name="home" size={24} color="#f2def7" />
          <FontAwesome name="search" size={24} color="#f2def7" />
          <FontAwesome name="bell" size={24} color="#f2def7" />
          <FontAwesome name="user" size={24} color="#f2def7" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  neonBorder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 5,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  menuIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
    marginBottom: 20, 
  },
  listContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#', 
    width: '90%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#6a00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#6a00ff',
    paddingVertical: 10,
    marginTop: 'auto',
    paddingHorizontal: 10,
  },
});
