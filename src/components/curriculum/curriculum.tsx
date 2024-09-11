import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
 
export default function CurriculumScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currículo</Text>
 
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Endereço" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Data de Nascimento" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Estado Civil" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Sexo" placeholderTextColor="#888" />
        br
        <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
        <TextInput style={styles.input} placeholder="Instituição" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Curso" placeholderTextColor="#888" />
      </View>
 
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    color: '#fff',
    fontFamily: 'arial',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#6a00ff',
  },

  button: {
    backgroundColor: '#6a00ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});