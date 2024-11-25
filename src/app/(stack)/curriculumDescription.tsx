import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Pressable, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { db, doc, getDoc, updateDoc, arrayUnion, Timestamp, collection, query, where, getDocs, deleteDoc, addDoc, setDoc } from '../../../firebaseConfig';
import { useLocalSearchParams } from 'expo-router';  // Importando o hook do expo-router

// Defina o tipo para os dados do currículo
interface CurriculoData {
  Nome?: string;
  Endereco?: string;
  DataNascimento?: string;
  EstadoCivil?: string;
  Sexo?: string;
  Experiencia?: string;
  Formacao?: string[]; // Array com os detalhes educacionais
  HorarioLetivo?: string;
  PdfLink?: string;
}

const CurriculoScreen: React.FC = () => {
  // Usando useLocalSearchParams para acessar os parâmetros da rota
  const { userId, vagaId } = useLocalSearchParams<{ userId: string; vagaId: string }>();

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

  const aceitarCurriculo = async () => {
    try {
      const candidaturaRef = collection(db, "Candidatura");
      const q = query(candidaturaRef, where("Id_Usuario", "==", userId), where("Id_Vaga", "==", vagaId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const candidaturaDocRef = querySnapshot.docs[0].ref;
        await updateDoc(candidaturaDocRef, {
          status: 'Aceito',
          dataAceitacao: new Date().toISOString(),
        });

        await adicionarNotificacao(userId, vagaId);
        Alert.alert("Currículo aceito com sucesso!");
      } else {
        Alert.alert("Candidatura não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao aceitar currículo:", error);
      Alert.alert("Erro ao aceitar o currículo. Tente novamente.");
    }
  };

  const adicionarNotificacao = async (usuarioId: string, vagaId: string) => {
    try {
      const vagaRef = doc(db, "Vagas", vagaId);
      const vagaDoc = await getDoc(vagaRef);

      if (vagaDoc.exists()) {
        const vagaData = vagaDoc.data();
        const empresaId = vagaData.EmpresaID;

        if (!empresaId) {
          throw new Error("EmpresaID não encontrado na vaga.");
        }

        const empresaRef = doc(db, "Empresa", empresaId);
        const empresaDoc = await getDoc(empresaRef);

        if (empresaDoc.exists()) {
          const empresaNome = empresaDoc.data().nome;

          if (!empresaNome) {
            throw new Error("Nome da empresa não encontrado.");
          }

          const notificacoesRef = doc(db, "Notificacoes", usuarioId);
          const notificacoesDoc = await getDoc(notificacoesRef);

          if (notificacoesDoc.exists()) {
            await updateDoc(notificacoesRef, {
              notificacoes: arrayUnion({
                mensagem: `Sua candidatura para a vaga foi aceita pela empresa ${empresaNome}!`,
                vagaId: vagaId,
                data: Timestamp.now(),
                lida: false,
              }),
            });
          } else {
            await setDoc(notificacoesRef, {
              notificacoes: [
                {
                  mensagem: `Sua candidatura para a vaga foi aceita pela empresa ${empresaNome}!`,
                  vagaId: vagaId,
                  data: Timestamp.now(),
                  lida: false,
                },
              ],
            });
          }
          console.log("Notificação enviada com sucesso!");
        } else {
          throw new Error("Empresa não encontrada com o ID fornecido.");
        }
      } else {
        throw new Error("Vaga não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao adicionar notificação:", error);
    }
  };

  const guardarCurriculo = async () => {
    try {
      await addDoc(collection(db, "CurriculosSalvos"), {
        usuarioId: userId,
        vagaId: vagaId,
      });
      Alert.alert("Currículo guardado com sucesso!");
    } catch (error) {
      console.error("Erro ao guardar currículo:", error);
      Alert.alert("Erro ao guardar o currículo. Tente novamente.");
    }
  };

  const excluirCurriculo = async () => {
    try {
      const candidaturaRef = collection(db, "Candidatura");
      const q = query(candidaturaRef, where("Id_Usuario", "==", userId), where("Id_Vaga", "==", vagaId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const candidaturaDocRef = querySnapshot.docs[0].ref;
        await deleteDoc(candidaturaDocRef);
        Alert.alert("Currículo excluído com sucesso!");
      } else {
        Alert.alert("Candidatura não encontrada.");
      }
    } catch (error) {
      console.error("Erro ao excluir currículo:", error);
      Alert.alert("Erro ao excluir o currículo. Tente novamente.");
    }
  };

  if (!curriculoData) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.neonBorder}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Currículo de {curriculoData.Nome}</Text>
        </View>

        <View style={styles.topSection}>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topText}>Vaga: {vagaId}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topText}>Usuário: {userId}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <FontAwesome name="map" size={24} color="#f2def7" />
            <Text style={styles.infoText}>Endereço: {curriculoData.Endereco || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="calendar" size={24} color="#f2def7" />
            <Text style={styles.infoText}>Nascimento: {curriculoData.DataNascimento || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="venus-mars" size={24} color="#f2def7" />
            <Text style={styles.infoText}>Sexo: {curriculoData.Sexo || "Não disponível"}</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="venus" size={24} color="#f2def7" />
            <Text style={styles.infoText}>Experiência: {curriculoData.Experiencia || "Não disponível"}</Text>
          </View>

          <Text style={styles.description}>
            Formação: {curriculoData.Formacao ? curriculoData.Formacao.join(', ') : "Não disponível"}
          </Text>

          <Text style={styles.requirements}>Horário Letivo: {curriculoData.HorarioLetivo || "Não disponível"}</Text>

          <Pressable style={styles.button} onPress={aceitarCurriculo}>
            <Text style={styles.buttonText}>Aceitar Currículo</Text>
          </Pressable>
          
          <Pressable style={styles.button} onPress={guardarCurriculo}>
            <Text style={styles.buttonText}>Guardar Currículo</Text>
          </Pressable>
          
          <Pressable style={styles.button} onPress={excluirCurriculo}>
            <Text style={styles.buttonText}>Excluir Currículo</Text>
          </Pressable>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  neonBorder: {
    borderWidth: 5,
    borderColor: '#ff00ff',
    padding: 10,
    margin: 10,
  },
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2def7',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topButton: {
    backgroundColor: '#ff00ff',
    padding: 10,
    borderRadius: 5,
  },
  topText: {
    color: '#fff',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
  },
  requirements: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ff00ff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default CurriculoScreen;
