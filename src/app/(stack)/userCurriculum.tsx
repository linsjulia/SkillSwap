import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
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
    <View style={styles.neonBorder}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{curriculoData.Nome}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map" size={24} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Endereço:</Text> {curriculoData.Endereco || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={24} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Data de Nascimento:</Text> {curriculoData.DataNascimento || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="heart" size={24} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Estado Civil:</Text> {curriculoData.EstadoCivil || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="venus-mars" size={24} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Sexo:</Text> {curriculoData.Sexo || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="briefcase" size={24} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Experiência:</Text> {curriculoData.Experiencia || "Não disponível"}</Text>
          </View>

          <View>
              <Text style={styles.infoText}><Text style={styles.boldText}>Nível de Escolaridade:</Text> {curriculoData.NivelEscolaridade}</Text>
          </View>

          <View>
              <Text style={styles.infoText}><Text style={styles.boldText}>Instituição:</Text> {curriculoData.Instituicao || "Não disponível"}</Text>
          </View>

          <View>
              <Text style={styles.infoText}><Text style={styles.boldText}>Curso:</Text> {curriculoData.Curso || "Não disponível"}</Text>
          </View>

          <View>
              <Text style={styles.infoText}><Text style={styles.boldText}>Início e Término:</Text> {curriculoData.inicioTermino || "Não disponível"}</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  neonBorder: {
    backgroundColor: '#000', 
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth: 5,
    borderColor: '#5900ff',
    flexGrow: 1,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  infoText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#f2def7',
    marginTop: 20,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default CurriculoScreen;
