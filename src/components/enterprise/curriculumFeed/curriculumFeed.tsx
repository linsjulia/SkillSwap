import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App(){
  const options = [
    'Desenvolvedor de Software',
    'Engenharia de Dados',
    'Segurança da Informação',
    'Suporte técnico',
    'Programador Mobile',
  ];

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <Text style={styles.headerText}>Feed de Currículos</Text>
      </View>

     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.navigationArrows}>
        <FontAwesome name="arrow-left" size={24} color="#6f00ff"></FontAwesome>
        <FontAwesome name="arrow-right" size={24} color="#6f00ff"></FontAwesome>    
    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginVertical: 60,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '##6f00ff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6f00ff',
    borderRadius: 20,
    width: 360,
    height: 450,
    textShadowColor: 'white',
    left: 12,

  },
  optionButton: {
    backgroundColor: '#6f00ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#6f00ff',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 10, // Para Android
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
  navigationArrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    top: -40,
  },
 
});


