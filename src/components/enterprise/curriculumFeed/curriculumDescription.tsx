import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function CurriculumScreen() { 

  const [formacao] = useState({
    nome: 'Nicole Oliveira Gonçalves',
    endereco: 'Rua das Flores, 123',
    dataNascimento: '01/01/2000',
    estadoCivil: 'Solteira',
    sexo: 'Feminino',
    instituicao: 'Universidade ABC',
    curso: 'Engenharia de Software',
    nivelEscolaridade: 'Ensino Superior',
    inicioTermino: '2018 - 2022',
    horario: 'Matutino'
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nicole Oliveira</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        <Text style={styles.infoText}>Nome: {formacao.nome}</Text>
        <Text style={styles.infoText}>Endereço: {formacao.endereco}</Text>
        <Text style={styles.infoText}>Data de Nascimento: {formacao.dataNascimento}</Text>
        <Text style={styles.infoText}>Estado Civil: {formacao.estadoCivil}</Text>
        <Text style={styles.infoText}>Sexo: {formacao.sexo}</Text>
        
        <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
        <Text style={styles.infoText}>
          Nível de Escolaridade: {formacao.nivelEscolaridade} {'\n'}
          Instituição: {formacao.instituicao} {'\n'}
          Início e Término do Curso: {formacao.inicioTermino}
        </Text>
        <Text style={styles.infoText}>
          Curso: {formacao.curso} {'\n'}
          Instituição: {formacao.instituicao} {'\n'}
          Início e Término do Curso: {formacao.inicioTermino}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.saveButton]}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.acceptButton]}>
          <Text style={styles.buttonText}>Aceito</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
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
  infoText: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#6a00ff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
  },
  deleteButton: {
    backgroundColor: '#ff4444', 
  },
  saveButton: {
    backgroundColor: '#6a00ff',
  },
  acceptButton: {
    backgroundColor: '#4CAF50', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
