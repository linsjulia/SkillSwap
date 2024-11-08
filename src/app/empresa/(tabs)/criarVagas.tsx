import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function JobFormScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Título da vaga</Text>
        <TextInput style={styles.input} placeholder="Local" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Salário" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Modelo de trabalho" placeholderTextColor="#888" />
        <TextInput
          style={[styles.input, styles.largeInput]}
          placeholder="Informações da vaga"
          placeholderTextColor="#888"
          multiline
        />
        <TextInput style={styles.input} placeholder="Exigências" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Resumo" placeholderTextColor="#888" />

        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>👁 Visualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar Vaga</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    top: 20,
    width: 330,
    paddingVertical: 20,
    borderRadius: 15,
    borderColor: '#6f00ff',
    borderWidth: 2,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  largeInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  viewButton: {
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  viewButtonText: {
    color: '#7700ff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#7700ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
