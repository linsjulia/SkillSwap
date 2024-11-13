import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

export default function ResetPasswordScreen() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (newPassword === confirmPassword) {
      console.log("Senha redefinida com sucesso:", newPassword);
      router.push('/checkmark');
    } else {
      console.log("As senhas não coincidem");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>

      <Pressable onPress={() => router.back()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <Text style={styles.title}>Redefinição de Senha</Text>
        
        {/* Espaço entre o título*/}
        <View style={styles.spacing} />

        {/* Campo para Senha Antiga */}
        <TextInput
          style={styles.input}
          placeholder="Senha antiga"
          placeholderTextColor="#888"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        
        {/* Campo para Nova Senha */}
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        
        {/* Campo para Confirmar Nova Senha */}
        <TextInput
          style={styles.input}
          placeholder="Confirme a nova senha"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Redefinir Senha</Text>
          </Pressable>
          <TouchableOpacity onPress={() => console.log("Outras opções de redefinição")}>
            <Text style={styles.otherOptionText}>Tentar de outra forma</Text>
          </TouchableOpacity>
        </View>
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

  backIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60, 
    marginBottom: 20,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  spacing: {
    height: 50, 
  },

  section: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
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

  otherOptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    top: 18,
    textDecorationLine: 'underline',
  },

  buttonContainer: {
    marginTop: 30,
    height: 150,
    alignItems: 'center',
  },
});
