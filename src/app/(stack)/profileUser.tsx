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
  ProfileImageUrl?: string; 
  site: string;
  portfolio?: { url: string; description: string };
  area_atuacao: string;
}

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');

  const firestore = getFirestore();

  const getUserProfile = async () => {
    if (!userId) return;

    try {
      const docRef = doc(firestore, 'Usuário', userId);
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
      const storedUserId = await AsyncStorage.getItem('IdUsuario');
      console.log('UserId recuperado do AsyncStorage:', storedUserId);

      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        console.log("Erro: UserID não encontrado");
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

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
          Meu objetivo é criar soluções digitais que impressionem visualmente, funcionem
          perfeitamente e proporcionem a melhor experiência ao usuário. Estou sempre disposto a
          aprender, enfrentar desafios e evoluir como profissional...
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if (userId) {
              router.push(`/userCurriculum?userId=${userId}`);
            }
          }}
        >
          <LinearGradient
            colors={['#9900ff', '#5900ff', '#0084ff']}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Currículo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: -60,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
  },
  label: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  link: {
    color: '#3498db',
  },
  button: {
    marginTop: 20,
  },
  gradient: {
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProfileScreen;
