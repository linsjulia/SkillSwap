import { auth } from '@/firebaseConfig';
import { router } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

export interface UserProfile {
  nome: string;
  email: string;
  data_nascimento: string;
  profileImageUrl?: string; 
  site: string;
  portfolio?: { url: string; description: string };
  area_atuacao: string;
  resumo?: string;
}

export default function ProfileScreen() {
  const [UserProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const firestore = getFirestore();

  const getUserProfile = async (setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      const docRef = doc(firestore, 'Usuário', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      } else {
        console.log("nenhum documento");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário", error);
    }
  };

  useEffect(() => {
    getUserProfile(setUserProfile);
  }, []);

  useEffect(() => {
    const fetchUserProfileBannerImage = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userDocRef = doc(db, 'Usuário', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setProfileImageUrl(userDoc.data()?.profileImageUrl || null);
        setBannerImageUrl(userDoc.data()?.bannerImageUrl || null);
      }
    };

    fetchUserProfileBannerImage();
  }, []);

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
        <Text style={styles.name}>{UserProfile?.nome}</Text>
      </View>

      <Pressable
        style={styles.settingsIcon}
        onPress={() => {
          router.replace('/(stack)/settings');
        }}
      >
        <Icon name="settings-outline" size={26} color="#fff" />
      </Pressable>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Área de Atuação</Text>
        <Text style={styles.value}>{UserProfile?.area_atuacao}</Text>

        <Text style={styles.label}>Contato</Text>
        <Text style={[styles.value, styles.link]}>{UserProfile?.email}</Text>

        <Text style={styles.label}>Localização</Text>
        <Text style={styles.value}>São Paulo</Text>

        <Text style={styles.label}>Resumo</Text>
        <Text style={styles.value}>
          {UserProfile?.resumo || "Resumo não disponível"}
   
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            const userId = auth.currentUser?.uid;
            if (userId) {
              
              router.push(`/(stack)/meuCurriculo?userId=${userId}`);
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
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000', 
  },
  header: {
    bottom: 30,
    paddingVertical: 0,
    alignItems: 'center',
    marginBottom: 0,
    position: 'relative', 
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 55,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#00a2ff"
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  settingsIcon: {
    position: 'absolute',
    top: 10, 
    right: 10, 
  },
  infoContainer: {
    backgroundColor: '#12133f', 
    padding: 34,
    marginHorizontal: 24,
    borderRadius: 10,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#5900ff'
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#BBB',
    marginBottom: 15,
  },
  link: {
    color: '#8400ff',
    textDecorationLine: 'underline',
  },
  button: {
    paddingVertical: 32,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 65,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});