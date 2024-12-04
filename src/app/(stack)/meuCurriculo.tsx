import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { db, doc, getDoc } from '../../../firebaseConfig';
import { useLocalSearchParams } from 'expo-router';

interface CurriculoData {
  Nome?: string;
  Endereco?: string;
  DataNascimento?: string;
  EstadoCivil?: string;
  Sexo?: string;
  Instituicao?: string;
  Curso?: string;
  NivelEscolaridade?: string[];
  inicioTermino?: string;
  horario?: string;
  Experiencia?: string;
  PdfLink?: string;
  
}

const CurriculoScreen: React.FC = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  const [curriculoData, setCurriculoData] = useState<CurriculoData | null>(null);

  useEffect(() => {
    const fetchCurriculo = async () => {
      try {
        const curriculoRef = doc(db, "Curriculo", userId);
        const curriculoDoc = await getDoc(curriculoRef);

        if (curriculoDoc.exists()) {
          setCurriculoData(curriculoDoc.data() as CurriculoData);
        } else {
          Alert.alert("Currículo não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar currículo:", error);
        Alert.alert("Erro ao carregar o currículo. Tente novamente.");
      }
    };

    fetchCurriculo();
  }, [userId]);

  if (!curriculoData) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.neonBorder}>
      <Text style={styles.title}>Currículo do candidato:</Text>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{curriculoData.Nome}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Endereço:</Text> {curriculoData.Endereco || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Data de Nascimento:</Text> {curriculoData.DataNascimento || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="heart" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Estado Civil:</Text> {curriculoData.EstadoCivil || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="venus-mars" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Sexo:</Text> {curriculoData.Sexo || "Não disponível"}</Text>
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: "#FFF", padding: 10, marginBottom: 30}}></View>
          <View>
          <Text style={styles.boldText}>Experiência:</Text>
            {/* <FontAwesome name="briefcase" size={20} color="#f2def7" /> */}
            <Text style={styles.infoText}> {curriculoData.Experiencia || "Não disponível"}</Text>
          </View>

          <View>
              <Text style={styles.boldText}>Nível de Escolaridade:</Text> 
              <Text style={styles.infoText}>{curriculoData.NivelEscolaridade || "Não disponível"}</Text>
          </View>

          <View>
            <Text style={styles.boldText}>Instituição:</Text> 
              <Text style={styles.infoText}>{curriculoData.Instituicao || "Não disponível"}</Text>
          </View>

          <View>
              <Text style={styles.boldText}>Curso:</Text> 
              <Text style={styles.infoText}>{curriculoData.Curso || "Não disponível"}</Text>
          </View>

          <View>
             <Text style={styles.boldText}>Início e Término:</Text>
              <Text style={styles.infoText}> {curriculoData.inicioTermino || "Não disponível"}</Text>
          </View>

          {curriculoData.NivelEscolaridade && (
            <Text style={styles.subtitle}>Formação Acadêmica</Text>
          )}

          {curriculoData.horario && (
            <Text style={styles.infoText}><Text style={styles.boldText}>Horário Letivo:</Text> {curriculoData.horario}</Text>
          )}
          
          {curriculoData.PdfLink && (
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Portfólio:</Text> 
            
            </Text>
          )}
        </View>
       
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  neonBorder: {
    backgroundColor: '#000000', 
    // padding: 20,
    marginBottom: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: "#1a0b48",
    borderWidth: 1,
    borderColor: '#5900ff',
    borderRadius: 10,
    marginTop: 50
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 40,
    marginBottom: 0,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  infoContainer: {
    marginBottom: 20,
    padding: 10,
    
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  infoText: {
    color: '#ffffff',
    marginLeft: 10,
    fontSize: 16,
    padding: 12,
    
    
  },
  subtitle: {
    fontSize: 20,
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
   
  },
  boldText: {
    fontWeight: 'bold',
    color: "white",
    margin: 7,
    fontSize: 15
  },
});

export default CurriculoScreen;
