import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; 
import { useRouter } from 'expo-router';

export default function ApplicationConfirmationScreen() {
  const router = useRouter();

  const handleBackToHome = () => {

    router.replace('/(tabs)')
  };

  return (
    <View style={styles.container}>
     
        <LinearGradient 
        colors={['#aa29ff', '#0084ff']}
        style={styles.content} >
        <Text style={styles.title}>Candidatura Realizada com Sucesso!</Text>
        <Text style={styles.message}>
          Parabéns! Sua candidatura foi registrada com sucesso. A empresa revisará suas informações e entrará em contato caso você seja selecionado para a próxima etapa.
        </Text>
        
        <TouchableOpacity onPress={handleBackToHome} style={styles.button}>
            <Text style={styles.buttonText}>Voltar para o início</Text>
        </TouchableOpacity>
        </LinearGradient>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#110531',
    padding: 20,
  },
  content: {
    backgroundColor: '#7700ff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#002ab4',
    margin: 10

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
    
  },
  button: {
    marginTop: 20,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#5222ff",
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 4, 
    elevation: 5,
  },
  

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
