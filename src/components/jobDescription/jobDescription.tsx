import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';
 
export default function JobScreen() {
  return (
    <View style={styles.neonBorder}>
      <View style={styles.container}>
 
        <View style={styles.header}>
          <Text style={styles.title}>Desenvolvedor de Software</Text>
        </View>

        <View style={styles.topSection}>
          <Text style={styles.topText}>Vaga</Text>
          <Text style={styles.topText}>Empresa</Text>
        </View>
 
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="location-outline" size={24} color="#6a00ff" />
            <Text style={styles.infoText}>São Paulo - SP a 17kms de você</Text>
          </View>
 
          <View style={styles.infoRow}>
            <Icon name="cash-outline" size={24} color="#6a00ff" />
            <Text style={styles.infoText}>R$ 2.500 Bruto mensal</Text>
          </View>
 
          <View style={styles.infoRow}>
            <Icon name="briefcase-outline" size={24} color="#6a00ff" />
            <Text style={styles.infoText}>Presencial</Text>
          </View>
 
          <Text style={styles.description}>
            Estamos em busca de desenvolvedores de software habilidosos para se
            unirem à nossa equipe dinâmica na vaga que oferecemos. Se você é
            apaixonado por tecnologia e inovação, este é o lugar ideal para você
            prosperar profissionalmente.
          </Text>
 
          <Text style={styles.requirements}>Exigências</Text>
          <Text style={styles.resume}>Resumo</Text>
 
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Candidatar-me</Text>
          </TouchableOpacity>
        </View>
 
        <View style={styles.footer}>
          <Icon name="briefcase-outline" size={28} color="#6a00ff" />
          <Icon name="search" size={28} color="#6a00ff" /> 
          <Icon name="notifications-outline" size={28} color="#6a00ff" />
          <Icon name="person-outline" size={28} color="#6a00ff" />
        </View>
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
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#6a00ff',
    paddingBottom: 6,
    marginBottom: 1,
  },

  topText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8, 
  },

  header: {
    paddingBottom: 10,
  },

  title: {
    color: '#fff', // Texto branco
    fontSize: 24,
    fontWeight: '500', // Fonte mais fina
    textShadowColor: '#6A35FF', // Cor do brilho neon
    textShadowOffset: { width: 0, height: 0 }, // Direção do neon
    textShadowRadius: 12, // Tamanho do efeito neon 
  },

  infoContainer: {
    marginVertical: 20,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  infoText: {
    color: '#fff', 
    marginLeft: 10,
    fontSize: 16,
  },

  description: {
    color: '#fff',
    marginVertical: 20,
  },
 
  requirements: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  
  resume: {
    color: '#fff', 
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
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
  
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#6a00ff',
    paddingVertical: 10,
    marginTop: 'auto',
  },
});
 