import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useLocalSearchParams, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  nome: string;
  email: string;
  profileImageUrl: string;
  resumo: string;
}

const CandidatosVaga: React.FC = () => {
  const { vagaId, titulo } = useLocalSearchParams() as { vagaId: string; titulo: string };
  
  const [candidatos, setCandidatos] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidatos = async () => {
    setIsLoading(true);
    const firestore = getFirestore();

    try {
      console.log('Iniciando consulta Firestore...');
      const candidaturaRef = collection(firestore, 'Candidatura');
      const q = query(candidaturaRef, where('Id_Vaga', '==', vagaId));

      const querySnapshot = await getDocs(q);
      console.log('Consulta realizada com sucesso', querySnapshot);

      if (!querySnapshot.empty) {
        const candidatosData: User[] = [];
        for (const docSnap of querySnapshot.docs) {
          const candidatura = docSnap.data();
          const userRef = doc(firestore, 'Usuário', candidatura.Id_Usuario);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() || {};
            candidatosData.push({
              id: candidatura.Id_Usuario, 
              nome: userData?.nome || "Nome não disponível",
              email: userData?.email || "Email não disponível",
              profileImageUrl: userData?.profileImageUrl || "nao sei",
              resumo: userData?.resumo || "Resumo indisponível"
            });
          }
        }
        setCandidatos(candidatosData);
      } else {
        setError('Nenhum candidato encontrado para esta vaga.');
      }
    } catch (err) {
      console.error('Erro ao buscar candidatos:', err);
      setError('Erro ao carregar os candidatos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatos();
  }, [vagaId]);

  const handleCardPress = (userId: string) => {
    AsyncStorage.setItem('IdUsuario', userId)
      .then(() => {
        console.log('IdUsuario armazenado:', userId);
        router.push(`/profileUser?userId=${userId}`);  
      })
      .catch((error) => {
        console.error('Erro ao salvar no AsyncStorage:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Candidatos para: {titulo}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={candidatos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: User }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(item.id)} 
            >
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#8400ff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#aaa',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
});

export default CandidatosVaga;
