import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, ActivityIndicator  } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { db, doc, getDoc, deleteDoc, collection, addDoc, Timestamp } from '../../../firebaseConfig';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';

import { set } from 'react-hook-form';

interface CurriculoData {
  nome: string;
  endereco: string;
  dataNascimento: string;
  estadoCivil: string;
  sexo: string;
  instituicao: string;
  curso: string;
  nivelEscolaridade: string;
  inicioTermino: string;
  horario: string;
  experiencia: string;
  portfolio: string;
}

const CurriculoScreen: React.FC = () => {
  const { userId, vagaId } = useLocalSearchParams<{ userId: string; vagaId: string }>();
  const [curriculoData, setCurriculoData] = useState<CurriculoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess ] = useState(false);

  useEffect(() => {
    console.log("User ID:", userId);
    console.log("Vaga ID:", vagaId);
  }, [userId, vagaId]);


  const [formacao, setFormacao] = useState<CurriculoData>({
    nome: '',
    endereco: '',
    dataNascimento: '',
    estadoCivil: '',
    sexo: '',
    instituicao: '',
    curso: '',
    nivelEscolaridade: '',
    inicioTermino: '',
    horario: '',
    experiencia: '',
    portfolio: ''
  });



  useEffect(() => {
    const fetchCurriculo = async () => {
      try {
        setLoading(true);

        const curriculoRef = doc(db, "Curriculo", userId);
        const curriculoDoc = await getDoc(curriculoRef);

        if (curriculoDoc.exists()) {
          const data = curriculoDoc.data();
          setFormacao({
            nome: data.Nome || '',
            endereco: data.Endereco || '',
            dataNascimento: data.DataNascimento || '',
            estadoCivil: data.EstadoCivil || '',
            sexo: data.Sexo || '',
            instituicao: data.Formacao[1] || '',
            curso: data.Formacao[2] || '',
            nivelEscolaridade: data.Formacao[0] || '',
            inicioTermino: data.Formacao[3] || '',
            horario: data.HorarioLetivo || '',
            experiencia: data.Experiencia || '',
            portfolio: data.PdfLink || ''
          });
          // setCurriculoData(curriculoDoc.data() as CurriculoData);
        } else {
          Alert.alert("Currículo não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar currículo:", error);
        Alert.alert("Erro ao carregar o currículo. Tente novamente.");
      } finally {
        setLoading(false)
      }
    };

    fetchCurriculo();
  }, [userId]);

  const handleDescartar = async () => {
    try {
      const candidaturaRef = doc(db, "Candidaturas", userId);
      await deleteDoc(candidaturaRef);
      Alert.alert("Candidatura excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir a candidatura:", error);
      Alert.alert("Erro ao excluir a candidatura. Tente novamente.");
    }
  };

  const handleAceitar = async () => {
    setLoading(true);
    try {
      // Validações
      if (!vagaId || !userId) {
        Alert.alert("Erro", "Informações da vaga ou usuário estão incompletas.");
        return;
      }
  
      // Obtendo os dados do currículo
      const curriculoRef = doc(db, "Curriculo", userId);
      const curriculoDoc = await getDoc(curriculoRef);
  
      if (!curriculoDoc.exists()) {
        Alert.alert("Erro", "Currículo não encontrado.");
        return;
      }
  
      // Salvando os dados em 'CurriculosSalvos'
      const savedCurriculoRef = collection(db, "CurriculosSalvos");
      await addDoc(savedCurriculoRef, {
        ...curriculoDoc.data(),
        vagaId: vagaId,
        userId: userId,
        dataAceite: Timestamp.now(),
      });
  
      // Removendo a candidatura
      const candidaturaRef = doc(db, "Candidaturas", userId);
      await deleteDoc(candidaturaRef);
  
      // Exibindo animação de sucesso
      setSuccess(true);
      setTimeout(() => {
        Alert.alert("Sucesso!", "Currículo aceito e salvo com sucesso!");
        router.push("/empresa/(tabs)/home"); 
      }, 1500);
    } catch (error) {
      console.error("Erro ao aceitar o currículo:", error);
      Alert.alert("Erro", "Não foi possível aceitar o currículo.");
    } finally {
      setLoading(false);
    }
  
  
    

    // try {
    //   const notificacaoRef = collection(db, "Notificacoes");
    //   const notificationData = {
    //     data: Timestamp.now(),
    //     lida: true,
    //     mensagem: `Sua candidatura para a vaga foi aceita!`,
    //     vagaId: vagaId,
    //   };

    //   await addDoc(notificacaoRef, notificationData);
    //   Alert.alert("Candidatura aceita e notificação enviada!");
    // } catch (error) {
    //   console.error("Erro ao enviar notificação:", error);
    //   Alert.alert("Erro ao enviar a notificação. Tente novamente.");
    // }
  };

  if (!formacao) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='white'/>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.neonBorder}>
      <Text style={styles.titleMain}>Currículo do candidato</Text>
        <View style={styles.header}>
          <Text style={styles.title}>{formacao.nome}</Text>
        </View>
      <View style={styles.container}>
       

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Endereço:</Text> {formacao.endereco || "Não disponível"}</Text>
          </View>

          {success ? (
          <View style={styles.overlay}>
          <LottieView
          source={require('../../../assets/animations/okay.json')} 
          autoPlay
          loop={false} 
          style={{ width: 170, height: 170 }}
          />
          </View>
          ) : null }  

          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Data de Nascimento:</Text> {formacao.dataNascimento || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="heart" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Estado Civil:</Text> {formacao.estadoCivil || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="venus-mars" size={20} color="#f2def7" />
            <Text style={styles.infoText}><Text style={styles.boldText}>Sexo:</Text> {formacao.sexo || "Não disponível"}</Text>
          </View>

          <View style={{ marginBottom: 15, marginTop: 50 }}>
          <Text style={styles.title}
          >
          Formação Acadêmica</Text>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: "#5900ff", padding: 10, marginBottom: 30 }}></View>

          {/* <View>
            <Text style={styles.boldText}>Experiência:</Text>
            <Text style={styles.infoText}> {curriculoData.experiencia || "Não disponível"}</Text>
          </View> */}

          <View>
            <Text style={styles.boldText}>Nível de Escolaridade</Text>
            <Text style={styles.infoText}>{formacao.nivelEscolaridade || "Não disponível"}</Text>
          </View>

          <View>
            <Text style={styles.boldText}>Instituição</Text>
            <Text style={styles.infoText}>{formacao.instituicao || "Não disponível"}</Text>
          </View>

          <View>
            <Text style={styles.boldText}>Curso</Text>
            <Text style={styles.infoText}>{formacao.curso || "Não disponível"}</Text>
          </View>

          <View>
            <Text style={styles.boldText}>Início e Término</Text>
            <Text style={styles.infoText}> {formacao.inicioTermino || "Não disponível"}</Text>
          </View>

          {formacao.horario && (
          <View>  
            <Text style={styles.boldText}>Horario Letivo</Text>
            <Text style={styles.infoText}>{formacao.horario}</Text>
          </View>
          )}

          {/* {curriculoData.PdfLink && (
            <Text style={styles.infoText}>
              <Text style={styles.boldText}>Portfólio:</Text>
            </Text> 
          )} */}
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row", gap: 80, marginBottom: 40, marginTop: 20 }}>
        <TouchableOpacity style={{ borderWidth: 1, borderColor: "#ff0000", padding: 13, borderRadius: 15, width: 100 }} onPress={handleDescartar}>
          <Text style={[{ color: "#ff0000", fontWeight: "bold", textAlign: "center" }]}>Descartar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: "#00eeff", padding: 13, borderRadius: 15, width: 110 }} onPress={handleAceitar}>
          <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Aceitar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  neonBorder: {
    backgroundColor: '#000000',
    marginBottom: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 0,
    backgroundColor: "#1a0b48",
    borderRadius: 10,
    marginTop: 30,
    width: 340,
  },
  header: {
    marginBottom: 0,
    textAlign: "left",
    padding: 30,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    left: 0,
    textAlign: "center",
    marginTop: 0,
    marginBottom: 0,
  },

  titleMain: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    left: 10,
    padding: 30,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 0,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },

  infoContainer: {
    marginBottom: 20,
    padding: 25,
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
  boldText: {
    fontWeight: 'bold',
    color: "white",
    margin: 7,
    fontSize: 17
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  overlay: {
    position: 'absolute',
    zIndex: 10, 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});

export default CurriculoScreen;
