import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  const handleApply = async () => {
    setIsLoading(true);
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

    router.push(`/curriculum?vagaId=${vagaIdString}&userId=${userId}`);
    setIsLoading(false);
  };


  
    const handleJobPress = () => {
      router.push({
        pathname: '/(stack)/profileUserPJ',
        params: {
          vagaIdT: vagaId,
        },
      });
    };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerBorder}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{title || 'Título da vaga'}</Text>
            <Text
              style={[styles.subtitle, { textDecorationLine: 'underline', color: '#8f3fff' }]}
              onPress={() => handleJobPress()}
            >
              {nameEnterprise || 'Nome da empresa'}
            </Text>
            <Text style={styles.location}>{location || 'Localização'}</Text>
          </View>
        </View>

        <View style={styles.jobInfo}>
          <View style={styles.infoContainer}>
            <Icon name="briefcase" size={18} color="white" style={{ top: 10, right: 5 }} />
            <Text style={styles.infoText}>{workForm}</Text>
            <Icon name="cash" size={18} color="white" style={{ top: 1, right: 5 }} />
            <Text style={styles.salary}>{salary}</Text>
          </View>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descrição do trabalho:</Text>
          <Text style={styles.description}>{description}</Text>
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
              <Text style={styles.applyButtonText}>Candidatar-me</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    width: 340,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    padding: 10,
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
    top: -20, 
    left: 30
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
    fontSize: 16,
  },
  listItem: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
    padding: 6,
  },
  listItemRequirement: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
    padding: 6,
  },
  sectionRequirements: {
    backgroundColor: '#271653',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    top: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: '100%',
    padding: 20,
  },
});
