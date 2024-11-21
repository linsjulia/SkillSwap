import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { db } from '../../../firebaseConfig'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';

interface Vaga {
  id: string;
  Titulo: string;
  Categoria?: string;
  Descricao?: string;
}

const JobSearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [jobs, setJobs] = useState<Vaga[]>([]);

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
        style={{ }}
          data={jobs}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          
          renderItem={({ item }) => (
            <View style={{ padding: 17, borderBottomWidth: 1, backgroundColor: '#7400ff', marginTop: 20, borderRadius: 10, height: 80, marginLeft: 10, marginRight: 10 }}>
              <Text style={{ color: 'white', fontWeight: "bold" }}>{item.Titulo}</Text>
              {/* <Text style={{ color: 'white' }}>{item.Categoria}</Text>
              <Text style={{ color: 'white' }}>{item.Descricao}</Text> */}
            </View>
          )}
         
        />
        
      ) : (
        <Text style={{ color: 'white' }}>Nenhuma vaga encontrada.</Text>
      )}
    </View>
  );
};

export default JobSearchScreen;
