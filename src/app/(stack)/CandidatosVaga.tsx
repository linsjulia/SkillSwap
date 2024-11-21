import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Href, router, useLocalSearchParams } from 'expo-router'; 

const CandidatosVaga: React.FC = () => {
  const { vagaId, titulo } = useLocalSearchParams() as { vagaId: string; titulo: string }; 
  const [candidatos, setCandidatos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidatos = async () => {
    setIsLoading(true);
    const firestore = getFirestore();
  
    try {

      const vagaRef = doc(firestore, 'Vagas', vagaId);
  

      const candidaturaRef = collection(firestore, 'Candidatura');
      const q = query(candidaturaRef, where('Id_Vagas', '==', vagaRef));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const candidatosData: any[] = [];
  
        for (const docSnap of querySnapshot.docs) {
          const candidatura = docSnap.data();
  
          // Obtém a referência do usuário a partir de Id_Usuario
          const userRef = candidatura.Id_Usuario; 
          const userDoc = await getDoc(userRef);
  
          if (userDoc.exists()) {
            const userData = userDoc.data() || {};
            candidatosData.push({
              id: docSnap.id,
              ...userData,
            });
          }
        }
  
        setCandidatos(candidatosData);
      } else {
        setError('Nenhum candidato encontrado para esta vaga.');
      }
    } catch (err) {
      console.error(err); 
      setError('Erro ao carregar os candidatos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidatos();
  }, [vagaId]);


  // const handleCardPress = (userId: string) => {
  //   const path: Href<string> = `/profile/${userId}`; // Aqui você força a tipagem para string
  //   router.push(path); // Passa a URL corretamente tipada
  // };

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
        renderItem={({ item }) => (
          <View
            style={styles.card}

          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
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
    // borderWidth: 1,
    // borderColor: "#6200ff"
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
    marginTop: 20
  },
  card: {
    backgroundColor: '#6500c4',
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
    // Adicione um estilo aqui para `list`
    paddingBottom: 20, // Exemplo de espaçamento inferior
  },
});

export default CandidatosVaga;
