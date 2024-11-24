import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, sendPasswordResetEmail } from "../../../firebaseConfig"; 
import { useRouter } from 'expo-router';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();

  // Função para lidar com a redefinição de senha
  const handleResetPassword = async (): Promise<void> => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    try {
      // Enviar o link de redefinição de senha para o e-mail
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sucesso', 'Um e-mail de redefinição foi enviado. Verifique sua caixa de entrada.');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao redefinir a senha', error);
      Alert.alert('Erro', 'Erro ao redefinir a senha. Verifique o e-mail inserido.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>

        <Pressable onPress={() => router.back()} style={styles.backIcon}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <Text style={styles.title}>Redefinição de Senha</Text>

        <View style={styles.spacing} />

        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
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
