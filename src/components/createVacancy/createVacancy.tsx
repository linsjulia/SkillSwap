import React from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function JobPostForm() {
  return (
    <View style={styles.neonBorder}>
      <View style={styles.container}>
        <Text style={styles.title}>Título da vaga</Text>

        <TextInput style={styles.input} placeholder="Local" placeholderTextColor="#8a8a8a" />
        <TextInput style={styles.input} placeholder="Salário" placeholderTextColor="#8a8a8a" />
        <TextInput style={styles.input} placeholder="Modelo de trabalho" placeholderTextColor="#8a8a8a" />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Informações da vaga"
          placeholderTextColor="#8a8a8a"
          multiline
        />
        <TextInput style={styles.input} placeholder="Exigências" placeholderTextColor="#8a8a8a" />
        <TextInput style={styles.input} placeholder="Resumo" placeholderTextColor="#8a8a8a" />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.eyeContainer}>
            <FontAwesome name="eye" size={24} color="#6a00ff" />
            <Text style={styles.eyeText}>Visualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton }>
            <Text style={styles.submitButtonText}>Enviar Vaga</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="newspaper-o" size={35} color="#6a00ff" /> {/* Jornal */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="pencil" size={35} color="#6a00ff" /> {/* Lápis */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="file-text" size={35} color="#6a00ff" /> {/* Folha */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="building" size={35} color="#6a00ff" /> {/* Empresa */}
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
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    width: '100%',
    maxWidth: 400,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
     paddingBottom: 20,
     textAlign: 'center'
  },
  
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyeContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  eyeText: {
    color: '#6a00ff',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#6a00ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 3, 
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
