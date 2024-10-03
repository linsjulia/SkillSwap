import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { router } from "expo-router"; 

interface Formacao {
  nome: string;
  endereco: string;
  dataNascimento: string;
  estadoCivil: string;
  sexo: string;
  instituicao: string;
  curso: string;
  nivelEscolaridade: string;
  inicioTermino: string;
  horario: string;
}

export default function CurriculumScreen() { 
  const [formacao, setFormacao] = useState<Formacao>({
    nome: '',
    endereco: '',
    dataNascimento: '',
    estadoCivil: '',
    sexo: '',
    instituicao: '',
    curso: '',
    nivelEscolaridade: '',
    inicioTermino: '',
    horario: ''
  });

  const handleChange = (name: keyof Formacao, value: string) => {
    setFormacao({
      ...formacao,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log(formacao);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Currículo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('nome', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('endereco', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('dataNascimento', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Estado Civil"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('estadoCivil', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('sexo', text)}
        />
  
        <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
        <TextInput
          style={styles.input}
          placeholder="Instituição"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('instituicao', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('curso', text)}
        />
        <Text style={styles.label}>Nível de Escolaridade:</Text>
        <Picker
          selectedValue={formacao.nivelEscolaridade}
          style={styles.picker}
          onValueChange={(itemValue) => handleChange('nivelEscolaridade', itemValue)}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Ensino Médio" value="Ensino Médio" />
          <Picker.Item label="Ensino Superior" value="Ensino Superior" />
          <Picker.Item label="Pós-Graduação" value="Pós-Graduação" />
        </Picker>
        <Text style={styles.label}>Início e Término do Curso:</Text>
        <TextInput
          style={styles.input}
          placeholder="Início e Término"
          placeholderTextColor="#888"
          onChangeText={(text) => handleChange('inicioTermino', text)}
        />
        <Text style={styles.label}>Horário Letivo:</Text>
        <View style={styles.radioContainer}>
          <View style={styles.radioItem}>
            <RadioButton
              value="Matutino"
              status={formacao.horario === 'Matutino' ? 'checked' : 'unchecked'}
              onPress={() => handleChange('horario', 'Matutino')}
            />
            <Text style={styles.radioText}>Matutino</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton
              value="Vespertino"
              status={formacao.horario === 'Vespertino' ? 'checked' : 'unchecked'}
              onPress={() => handleChange('horario', 'Vespertino')}
            />
            <Text style={styles.radioText}>Vespertino</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton
              value="Noturno"
              status={formacao.horario === 'Noturno' ? 'checked' : 'unchecked'}
              onPress={() => handleChange('horario', 'Noturno')}
            />
            <Text style={styles.radioText}>Noturno</Text>
          </View>
          <View style={styles.radioItem}>
            <RadioButton
              value="A distância"
              status={formacao.horario === 'A distância' ? 'checked' : 'unchecked'}
              onPress={() => handleChange('horario', 'A distância')}
            />
            <Text style={styles.radioText}>A distância</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
      <Pressable onPress={() => router.push('/checkmark')}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </Pressable>
      </TouchableOpacity>
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

  picker: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#6a00ff',
  },

  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },

  radioContainer: {
    marginTop: 10,
  },

  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  radioText: {
    color: '#fff',
    marginLeft: 8,
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
