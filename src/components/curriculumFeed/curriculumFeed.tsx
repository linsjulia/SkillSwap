import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ResumeFeed() {
  return (
    <View style={styles.neonBorder}>
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome name="bars" size={24} color="#6a00ff" />
          <Text style={styles.title}>Feed de Currículos</Text>
        </View>

        <ScrollView contentContainerStyle={styles.feedContainer}>
          <TouchableOpacity style={styles.jobButton}>
            <Text style={styles.jobText}>Desenvolvedor de Software</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jobButton}>
            <Text style={styles.jobText}>Engenharia de Dados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jobButton}>
            <Text style={styles.jobText}>Segurança da Informação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jobButton}>
            <Text style={styles.jobText}>Suporte técnico</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.jobButton}>
            <Text style={styles.jobText}>Programador mobile</Text>
          </TouchableOpacity>

          <View style={styles.arrowContainer}>
            <FontAwesome name="chevron-left" size={28} color="#6a00ff" />
            <FontAwesome name="chevron-right" size={28} color="#6a00ff" />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="newspaper-o" size={35} color="#8A2BE2" /> {/* Jornal */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="pencil" size={35} color="#8A2BE2" /> {/* Lápis */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="file-text" size={35} color="#8A2BE2" /> {/* Folha */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="building" size={35} color="#8A2BE2" /> {/* Empresa */}
        </TouchableOpacity>
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
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#8A2BE2',
    shadowColor: '#8A2BE2',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    marginTop: 20,
    textAlign: 'center'
  },
  feedContainer: {
    alignItems: 'center',
  },
  jobButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 15,
    width: '100%',
  },
  jobText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  iconButton: {
    margin: 20, 
  },
});
