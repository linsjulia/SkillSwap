import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { getDocs, getDoc, collection, query, limit, startAfter, QueryDocumentSnapshot, DocumentData, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import SliderItem from '../components/SliderItem';
import { router } from 'expo-router';

interface Job {
  id: string;
  title: string;
  image: string;
  nameEnterprise: string;
  description: string;
  salary: string;
  workForm: string;
  location: string;
  requirements: string[];
  benefits: string[];
}

interface LoadingOverlayProps {
  visible: boolean;
}

const { width } = Dimensions.get('screen');

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);

  const fetchJobs = async (loadMore = false) => {
    setLoading(true);
    try {
      const jobsRef = collection(db, 'Vagas');
      let jobsQuery = query(jobsRef, limit(7));

      if (loadMore && lastVisible) {
        jobsQuery = query(jobsRef, limit(7), startAfter(lastVisible));
      }

      const jobSnapshots = await getDocs(jobsQuery);

      if (!jobSnapshots || !jobSnapshots.docs) {
        console.error("Erro: jobSnapshots ou jobSnapshots.docs está indefinido");
        return;
      }

      if (jobSnapshots.empty) {
        setAllJobsLoaded(true);
        return;
      }

      const docs = jobSnapshots.docs;

      const jobData: Job[] = await Promise.all(docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        let companyName = 'Sem nome de empresa';
        let companyImage = '';
        
        if (data.EmpresaID) {
          try {
            const companyDocRef = doc(db, 'Empresa', data.EmpresaID); 
            const companyDoc = await getDoc(companyDocRef); 
            
            if (companyDoc.exists()) {
              console.log('Empresa encontrada:', companyDoc.data());
              const companyData = companyDoc.data() as { nome?: string; profileImageUrl?: string };
              companyName = companyData?.nome ?? 'Sem nome de empresa';
              companyImage = companyData?.profileImageUrl ?? ''; 
            } else {
              console.warn('Documento de empresa não encontrado para ID:', data.EmpresaID);
            }
          } catch (error) {
            console.error(`Erro ao buscar empresa com ID ${data.EmpresaID}:`, error);
          }
        }

        const requirementsArray = Array.isArray(data.Exigencias) ? data.Exigencias : [];
        const benefitsArray = Array.isArray(data.Beneficios) ? data.Beneficios : [];

        return {
          id: docSnapshot.id,
          title: data.Titulo ?? 'Sem título',
          image: companyImage,
          nameEnterprise: companyName,
          description: data.Descricao ?? 'Sem descrição',
          salary: data.Salario ?? 'Não informado',
          workForm: data.Forma_Trabalho ?? "Não informado",
          location: data.Localizacao ?? "Não informado",
          requirements: requirementsArray,
          benefits: benefitsArray,
        };
      }));

      if (jobData.length < 7) {
        setAllJobsLoaded(true);
      }

      if (loadMore) {
        setJobs(prevJobs => [...prevJobs, ...jobData]);
      } else {
        setJobs(jobData);
      }

      setLastVisible(docs[docs.length - 1]);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    if (allJobsLoaded) {
      alert('Sem mais vagas disponíveis');
      return;
    }
    setRefreshing(true);
    fetchJobs(true).then(() => setRefreshing(false));
  }, [allJobsLoaded]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
    if (!visible) return null;
    
    return (
      <View style={styles.overlayLoading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  return (
    <View>
      <LoadingOverlay visible={loading} /> 
      
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <SliderItem
            item={{
              id: item.id,
              title: item.title,
              image: item.image,
              description: item.description,
              nameEnterprise: item.nameEnterprise,
              salary: item.salary,
              workForm: item.workForm,
              location: item.location,
              requirements: item.requirements,
              benefits: item.benefits,
            }}
            index={jobs.indexOf(item)}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6f00ff"
          />
        }
        onEndReached={() => {
          if (!loading && !allJobsLoaded) {
            fetchJobs(true);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <Text style={{ textAlign: 'center', margin: 16 }}>Carregando...</Text> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayLoading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
});

export default Home;
