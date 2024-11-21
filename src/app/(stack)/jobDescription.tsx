import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '@/firebaseConfig';
import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';


interface JobDetailsScreenParams {
  vagaId?: string;
  title?: string;
  image?: string;
  description?: string;
  nameEnterprise?: string;
  salary?: string;
  requirements?: string | string[];
  benefits?: string | string[];
  location?: string;
  workForm?: string;
  publicationDate?: string;
}

export default function JobDetailsScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    vagaId,
    title,
    image,
    description,
    nameEnterprise,
    salary,
    requirements: requirementsParam,
    benefits: benefitsParam,
    location,
    workForm,
    publicationDate,
  } = useLocalSearchParams();

  const requirements = typeof requirementsParam === 'string'
    ? JSON.parse(requirementsParam)
    : Array.isArray(requirementsParam)
      ? requirementsParam
      : [];

  const benefits = typeof benefitsParam === 'string'
    ? JSON.parse(benefitsParam)
    : Array.isArray(benefitsParam)
      ? benefitsParam
      : [];

  console.log('Image URL in JobDescription:', image);

  const handleApply = async () => {
    setIsLoading(true);  
    const firestore = getFirestore();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
  
    if (!userId) {
      alert('Você precisa estar logado para se candidatar!');
      setIsLoading(false); 
      return;
    }
  
    
    const vagaIdString = Array.isArray(vagaId) ? vagaId[0] : vagaId || '';
  
    if (!vagaIdString) {
      alert('ID da vaga inválido!');
      setIsLoading(false);  
      return;
    }
  
    const userRef = doc(firestore, 'Usuário', userId);
    const vagaRef = doc(firestore, 'Vagas', vagaIdString);
  
    const candidaturaRef = collection(firestore, 'Candidatura');
  
    try {
      
      const q = query(
        candidaturaRef,
        where('Id_Usuario', '==', userRef),
        where('Id_Vagas', '==', vagaRef)
      );
      
      const querySnapshot = await getDocs(q);
  
     
      if (!querySnapshot.empty) {
        alert('Você já se aplicou para esta vaga!');
        setIsLoading(false);  
        return;
      }
  
      await addDoc(candidaturaRef, {
        Id_Usuario: userRef,  
        Id_Vagas: vagaRef,    
        Status: 'Pendente',   
      });
  
      
      console.log('Aplicação feita com sucesso!');
      router.replace("/(stack)/ApplicationConfirmationScreen"); 
  
    } catch (error) {
      console.error('Erro ao se aplicar para a vaga: ', error);
      alert('Erro ao se aplicar para a vaga');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerBorder}>
        <View style={styles.header}>
         
          <View style={styles.headerText}>
            <Text style={styles.title}>{title || 'Título da vaga'}</Text>
            <Text style={styles.subtitle}>{nameEnterprise || 'Nome da empresa'}</Text>
            <Text style={styles.location}>{location || 'Localização'}</Text>
          </View>
        </View>

        <View style={styles.jobInfo}>
          <View style={styles.infoContainer}>
            <Icon name="briefcase" size={18} color="white" style={{ top: 10, left: 15 }} />
            <Text style={styles.infoText}>{workForm}</Text>
          </View>
          <View style={styles.infoContainerSalary}>
            <Icon name="cash" size={18} color="white" style={{ top: 0 }} />
            <Text style={styles.salary}>{salary}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição do trabalho:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefícios:</Text>
          <View>
            {Array.isArray(benefits) && benefits.length > 0 ? (
              benefits.map((benefit: string, index: number) => (
                <Text key={index} style={styles.listItem}>{benefit}</Text>
              ))
            ) : (
              <Text style={styles.listItem}>Nenhum benefício especificado</Text>
            )}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Exigências:</Text>
        <View style={styles.sectionRequirements}>
          {Array.isArray(requirements) && requirements.length > 0 ? (
            requirements.map((requirement: string, index: number) => (
              <Text key={index} style={styles.listItemRequirement}>
                - {requirement}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>Nenhuma exigência especificada</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
            <LinearGradient
              colors={['#aa29ff', '#0099ff']}
              style={styles.gradient}
            >
              <Text style={styles.applyButtonText}>Aplicar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6f00ff" />
            <Text style={styles.loadingText}>Aplicando...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 10,
  },
  containerBorder: {
    flexGrow: 1,
    backgroundColor: '#1d103f',
    padding: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 0.8,
    shadowRadius: 50,
    shadowOffset: { width: 0, height: 0 },
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 20,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  location: {
    fontSize: 14,
    color: 'white',
  },
  jobInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
    gap: 10,
  },
  infoContainer: {
    flexBasis: '45%',
    marginVertical: 4,
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 10,
  },
  infoContainerSalary: {
    marginVertical: 10,
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    bottom: 10,
    left: 10,
    fontWeight: 'bold',
  },
  salary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 106,
  },
  applyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listItem: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#6200ee',
    textAlign: 'center',
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 105,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 12,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listItemRequirement: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
    padding: 14,
    borderRadius: 10,
  },
  sectionRequirements: {
    backgroundColor: '#271653',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    top: 37,
  },
});
