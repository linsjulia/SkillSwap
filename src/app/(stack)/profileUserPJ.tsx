import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  nome: string;
  email: string;
  data_nascimento: string;
  profileImageUrl?: string; 
  site: string;
  portfolio?: { url: string; description: string };
  area_atuacao: string;
  resumo: string;
}

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [empresaId, setEmpresaId] = useState<string>('');

  const firestore = getFirestore();

  const getUserProfile = async () => {
    if (!empresaId) return;

    try {
      const docRef = doc(firestore, 'Empresa', empresaId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setUserProfile(docSnap.data() as UserProfile);
      } else {
        console.log("Nenhum documento encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário", error);
    }
  };

  useEffect(() => {
    const fetchUserID = async () => {
      const storedEmpresaId = await AsyncStorage.getItem('IdEmpresa');
      console.log('EmpresaId recuperado do AsyncStorage:', storedEmpresaId);

      if (storedEmpresaId) {
        setEmpresaId(storedEmpresaId);
      } else {
        console.log("Erro: EmpresaID não encontrado");
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (empresaId) {
      getUserProfile();
    }
  }, [empresaId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={bannerImageUrl ? { uri: bannerImageUrl } : require('../../assets/banner.png')}
        style={{ height: 100, padding: 0 }}
      />
      <View style={styles.header}>
        <Image
          source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/user.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userProfile?.nome}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Área de Atuação</Text>
        <Text style={styles.value}>{userProfile?.area_atuacao}</Text>

        <Text style={styles.label}>Contato</Text>
        <Text style={[styles.value, styles.link]}>{userProfile?.email}</Text>

        <Text style={styles.label}>Localização</Text>
        <Text style={styles.value}>São Paulo</Text>

        <Text style={styles.label}>Resumo</Text>
        <Text style={styles.value}>
          {userProfile?.resumo || "Não disponível"}
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if (empresaId) {
              router.push(`/userCurriculum?userId=${empresaId}`);
            }
          }}
        >
          <LinearGradient
            colors={['#9900ff', '#5900ff', '#0084ff']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Visite nosso website</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#1e1e1e',
    padding: 20,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: -60,
  },
  name: {
    fontSize: 19,
    color: '#fff',
    marginTop: 15,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#5900ff",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#12133f",
    marginHorizontal: 10,
    marginBottom: 50,
    
  },
  label: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 10,
    padding: 5
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    padding: 5,
  },
  link: {
    color: '#8f3fff',
    textDecorationLine: "underline"
  },
  button: {
    marginTop: 40,
  },
  gradient: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfileScreen;
