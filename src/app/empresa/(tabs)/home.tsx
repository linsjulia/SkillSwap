import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed de Currículos</Text>
      
      <View style={styles.feedContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Desenvolvedor de Software</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Engenharia de Dados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Segurança da Informação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Suporte técnico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Programador mobile</Text>
          </TouchableOpacity>
        </ScrollView>
        
        <View style={styles.navigation}>
          <Text style={styles.navButton}>{"<<"}</Text>
          <Text style={styles.navButton}>{">>"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    color: '#E0E0E0',
    fontWeight: 'bold',
    marginBottom: 20,
    textShadowColor: '#7226ff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  feedContainer: {
    width: '90%',
    backgroundColor: '#111',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5900ff',
    top: 20,

  },
  scrollContainer: {
    alignItems: 'center',
  },
  item: {
    width: '90%',
    backgroundColor: '#6a00ff',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    gap: 20,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  navButton: {
    fontSize: 24,
    color: '#7700ff',
    paddingHorizontal: 20,
  },
});
