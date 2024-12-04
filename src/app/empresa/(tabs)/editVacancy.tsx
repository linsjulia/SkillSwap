import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/Ionicons";

const VagasEmpresa: React.FC = () => {
  const router = useRouter(); 
  const [vagas, setVagas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVagas = async () => {
    setIsLoading(true);
    const firestore = getFirestore();
    const EmpresaID = auth.currentUser ? auth.currentUser.uid : null;
  
    if (!EmpresaID) {
      setError('Você precisa estar logado como empresa para visualizar suas vagas.');
      setIsLoading(false);
      return;
    }
  
    try {
      const vagasRef = collection(firestore, 'Vagas');
      const q = query(vagasRef, where("EmpresaID", "==", EmpresaID));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const vagasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVagas(vagasData);
      } else {
        setError('Nenhuma vaga encontrada para esta empresa.');
      }
    } catch (err) {
      setError('Erro ao carregar as vagas.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchVagas();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/(stack)/Vacancy',  // Caminho da página de destino
          params: { vagaId: item.id, titulo: item.Titulo },  // Passando o ID da vaga e o título
        })
      }
    >

      <View style={{  }}>
     
      <Text style={styles.titulo}>{item.Titulo}</Text>
      <Icon style={{ left: 300,}} name='pencil' size={20} color="white"></Icon>
      </View>
      <Text style={styles.descricao}></Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{ color: "white", marginBottom: 40, marginTop: 20, textAlign: 'center', fontSize: 19, fontWeight: "bold"}}>Edição de Vagas</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={vagas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
    padding: 10,
    borderColor: "#6200ff"
  },
  list: {
    marginTop: 10,
    gap: 20,
    padding: 0,
    borderColor: "#6200ff",
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
    
  },
  card: {
    backgroundColor: '#7600fd',
    padding: 10,
    marginBottom: 0,
    borderRadius: 8,
    width: 350,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  descricao: {
    fontSize: 14,
    color: '#aaa',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default VagasEmpresa;