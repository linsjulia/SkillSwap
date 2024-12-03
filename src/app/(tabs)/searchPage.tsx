import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../../../firebaseConfig'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'expo-router'; 

interface Vaga {
  image: string | number | (string | number)[] | null | undefined;
  Empresa_ID: string | number | (string | number)[] | null | undefined;
  vagaId: string;
  Titulo: string;
  Categoria?: string;
  Descricao?: string;
  Salario?: string;
  Forma_Trabalho?: string;
  Localizacao?: string;
  nameEnterprise?: string;
  benefits?: string[];
  requirements?: string[];
}

const JobSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [jobs, setJobs] = useState<Vaga[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      const q = searchText
        ? query(collection(db, 'Vagas'), where('Titulo', '>=', searchText))
        : collection(db, 'Vagas');

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobList: Vaga[] = [];
        querySnapshot.forEach((doc) => {
          jobList.push({ vagaId: doc.id, ...doc.data() } as Vaga);
        });
        setJobs(jobList);
      });

      return () => unsubscribe();
    };

    fetchJobs();
  }, [searchText]);

  const handleJobPress = (item: Vaga) => {
    router.push({
      pathname: '/(stack)/jobDescription',
      params: {
        vagaId: item.vagaId,
        title: item.Titulo,
        image: item.image,
        description: item.Descricao,
        nome: item.nameEnterprise,
        salary: item.Salario,
        workForm: item.Forma_Trabalho,
        location: item.Localizacao,
        requirements: JSON.stringify(item.requirements),
        benefits: JSON.stringify(item.benefits)
      },
    });
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
          keyExtractor={(item) => item.vagaId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.jobItem}
              onPress={() => handleJobPress(item)} 
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
