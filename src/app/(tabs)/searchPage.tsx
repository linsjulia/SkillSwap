import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../../firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'expo-router';

interface Vaga {
  empresa_ID: string | number | (string | number)[] | null | undefined;
  id: string;
  Titulo: string;
  Categoria?: string;
  Descricao?: string;
  Salario?: string;
  Forma_Trabalho?: string;
  Localizacao?: string;
  nomeEmpresa?: string;
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

  const handleJobPress = (job: Vaga) => {
    // Navegar para a tela de detalhes da vaga passando os dados como parâmetros
    router.push({
      pathname: '/(stack)/jobDescription',
      params: {
        vagaId: job.id,
        title: job.Titulo,
        description: job.Descricao,
        category: job.Categoria,
        salary: job.Salario,
        workForm: job.Forma_Trabalho,
        location: job.Localizacao,
        nameEnterprise: job.empresa_ID,
        requirements: JSON.stringify(job.requirements),
        benefits: JSON.stringify(job.benefits)
      },
    });
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#111' }}>
      <TextInput
        placeholder="Pesquisar vaga..."
        placeholderTextColor="white"
        value={searchText}
        onChangeText={setSearchText}
        style={{
          borderWidth: 1,
          padding: 8,
          borderRadius: 8,
          marginBottom: 16,
          color: 'white',
          borderColor: 'white',
        }}
      />
      {jobs.length > 0 ? (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleJobPress(item)}
              style={{
                padding: 17,
                borderBottomWidth: 1,
                backgroundColor: '#7400ff',
                marginTop: 20,
                borderRadius: 10,
                height: 80,
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.Titulo}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ color: 'white' }}>Nenhuma vaga encontrada.</Text>
      )}
    </View>
  );
};

export default JobSearchScreen;
