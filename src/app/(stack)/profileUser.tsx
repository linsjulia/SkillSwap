import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export interface UserProfile {
  nome: string;
  email: string;
  data_nascimento: string;
  profileImageUrl?: string;
  site: string;
  portfolio?: { url: string; description: string };
  area_atuacao: string;
  resumo: string;
  bannerImageUrl?: string;
}

const ProfileUser: React.FC = () => {
  const { userId } = useLocalSearchParams() as { userId: string }; 
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const firestore = getFirestore();

  const getUserProfile = async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const docRef = doc(firestore, 'Usuário', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data() as UserProfile;
        console.log(userData);

        setUserProfile(userData);
        
        if (userData.profileImageUrl) {
          setProfileImageUrl(userData.profileImageUrl);
        }

        if (userData.bannerImageUrl) {
          setBannerImageUrl(userData.bannerImageUrl)
        }

       
      } else {
        console.log('Nenhum documento encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do usuário', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProfile();
    } else {
      const fetchUserID = async () => {
        const storedUserId = await AsyncStorage.getItem('IdUsuario');
        if (storedUserId) {
          getUserProfile();
        }
      };
      fetchUserID();
    }
  }, [userId]);


  

  return (

    <View style={styles.container}>
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        source={bannerImageUrl ? {uri: bannerImageUrl }: require('../../assets/banner.png')}
        style={styles.bannerImage}
      />
      <View style={styles.header}>
        <Image
          source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/user.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userProfile?.nome || 'Nome não disponível'}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Área de Atuação</Text>
        <Text style={styles.value}>{userProfile?.area_atuacao || 'Não disponível'}</Text>

        <Text style={styles.label}>Contato</Text>
        <Text style={[styles.value, styles.link]}>{userProfile?.email || 'Não disponível'}</Text>

        <Text style={styles.label}>Localização</Text>
        <Text style={styles.value}>São Paulo</Text>

        <Text style={styles.label}>Resumo</Text>
        <Text style={styles.value}>
          {userProfile?.resumo || 'Não disponível'}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (userId) {
              router.push(`/(stack)/userCurriculum?userId=${userId}`);
            }
          }}
        >
          <LinearGradient colors={['#9900ff', '#5900ff', '#0084ff']} style={styles.gradient}>
            <Text style={styles.buttonText}>Currículo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    padding: 0,
    flexGrow: 1,
  },

  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },

  bannerImage: {
    height: 110,
    borderRadius: 8,
    padding: 0,
    right: 60, 
    bottom: 20, 
   
    width: 450,
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
    borderColor: '#6200ff',
    marginTop: -70,
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
    borderColor: '#5900ff',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#12133f',
    marginHorizontal: 10,
    marginBottom: 50,
  },
  label: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 10,
    padding: 5,
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    padding: 5,
  },
  link: {
    color: '#8f3fff',
    textDecorationLine: 'underline',
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

  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileUser;
