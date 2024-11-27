import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../../../firebaseConfig'; // Importe seu arquivo de configuração do Firestore
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'expo-router'; // Usando o hook useRouter

interface Vaga {
  id: string;
  Titulo: string;
  Categoria?: string;
  Descricao?: string;
}

const JobSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [jobs, setJobs] = useState<Vaga[]>([]);
  const router = useRouter(); // Usando o hook useRouter

  useEffect(() => {
    const fetchJobs = async () => {
      const q = searchText
        ? query(collection(db, 'Vagas'), where('Titulo', '>=', searchText))
        : collection(db, 'Vagas'); // Se não houver pesquisa, pega todas as vagas

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobList: Vaga[] = [];
        querySnapshot.forEach((doc) => {
          jobList.push({ id: doc.id, ...doc.data() } as Vaga);
        });
        setJobs(jobList);
      });

      return () => unsubscribe();
    };

    fetchJobs();
  }, [searchText]);

  const handleJobPress = (vagaId: string) => {
    // Passando o vagaId para a URL para a página de descrição
    router.push(`/(stack)/jobDescription?vagaId=${vagaId}`); // A URL agora inclui o vagaId
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar vaga..."
        placeholderTextColor="white"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />
      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.jobItem}
              onPress={() => handleJobPress(item.id)} // Passando o vagaId para a navegação
            >
              <Text style={styles.jobTitle}>{item.Titulo}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noJobs}>Nenhuma vaga encontrada.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#111',
  },
  searchInput: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    color: 'white',
    borderColor: 'white',
  },
  jobItem: {
    padding: 17,
    borderBottomWidth: 1,
    backgroundColor: '#7400ff',
    marginTop: 20,
    borderRadius: 10,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  jobTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  noJobs: {
    color: 'white',
  },
});

export default JobSearchScreen;
