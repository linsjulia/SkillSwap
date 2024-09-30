import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importando o componente de ícones FontAwesome do Expo vector icons




export default function JobDescription() {
  return (
    <View style={styles.neonBorder}>
      <View style={styles.container}>
 
        <View style={styles.header}>
          <Text style={styles.title}>Desenvolvedor de Software</Text>
        </View>

        <View style={styles.topSection}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topText}>Vaga</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topText}>Empresa</Text>
          </TouchableOpacity> 
        </View>
 
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
          <FontAwesome name="map"  size={28} color="#f2def7" />
            <Text style={styles.infoText}>São Paulo - SP a 17kms de você</Text>
          </View>
 
          <View style={styles.infoRow}>
          <FontAwesome name="money"  size={28} color="#f2def7" />
            <Text style={styles.infoText}>R$ 2.500 Bruto mensal</Text>
          </View>
 
          <View style={styles.infoRow}>
          {/* <FontAwesomeIcon icon="a" size="2xs" style={{color: "#B197FC",}} /> */}
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
        <FontAwesome name="home"  size={28} color="#f2def7" />
        <FontAwesome name="search"  size={28} color="#f2def7" />
        <FontAwesome name="bell"  size={28} color="#f2def7" />
        <FontAwesome name="user"  size={28} color="#f2def7" />

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
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#6a00ff',
    paddingBottom: 6,
    marginBottom: 10, 
  },

  topButton: {
 
  },

  topText: {
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: '300',
  },

  header: {
    paddingBottom: 10,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
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
    lineHeight: 24,
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
    marginVertical: 10,
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
    paddingHorizontal: 10,
  },
});
