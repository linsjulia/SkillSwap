import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Modal, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import React from 'react';

export interface UserProfile {
  nome: string;
  email: string;
  data_nascimento: string;
  profileImageUrl?: string;
  bannerImageUrl?: string;
  website: string | undefined;
  area_atuacao: string;
  resumo: string;
}

export default function ProfileScreen() {
  const { vagaIdT } = useLocalSearchParams() as { vagaIdT: string };
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [website2, setWebsite] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const firestore = getFirestore();

  const getUserProfile = async () => {
    if (!vagaIdT) return;

    try {
      setLoading(true); // Ativa o loading

      const vagaRef = doc(firestore, 'Vagas', vagaIdT);
      const vagaSnap = await getDoc(vagaRef);

      if (vagaSnap.exists()) {
        const empresaId = vagaSnap.data().EmpresaID;

        if (empresaId) {
          const empresaRef = doc(firestore, 'Empresa', empresaId);
          const empresaSnap = await getDoc(empresaRef);

          if (empresaSnap.exists()) {
            const userData = empresaSnap.data() as UserProfile;

            setUserProfile(userData);
            setProfileImageUrl(userData.profileImageUrl || null);
            setBannerImageUrl(userData.bannerImageUrl || null);
            setWebsite(userData.website || null)
          } else {
            console.log("Documento da empresa não encontrado.");
          }
        } else {
          console.log("EmpresaID não encontrado na vaga.");
        }
      } else {
        console.log("Documento da vaga não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar os dados da vaga/empresa", error);
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [vagaIdT]);


  const handleButtonPress = () => {
    if (website2) {
      Linking.openURL(website2); // Abre o link no navegador
    } else {
      alert("O link do site não está disponível.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={bannerImageUrl ? { uri: bannerImageUrl } : require('../../assets/banner.png')}
          style={{ height: 110, padding: 0, right: 20, bottom: 20, width: 390 }}
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
          <Text style={styles.value}>{userProfile?.area_atuacao || "Não Disponível"}</Text>

          <Text style={styles.label}>Contato</Text>
          <Text style={[styles.value, styles.link]}>{userProfile?.email || "Erro"}</Text>

          <Text style={styles.label}>Resumo</Text>
          <Text style={styles.value}>{userProfile?.resumo || "Não disponível"}</Text>

          <TouchableOpacity style={styles.button}
          onPress={handleButtonPress}
          >
            <LinearGradient colors={['#9900ff', '#5900ff', '#0084ff']} style={styles.gradient}>
              <Text style={styles.buttonText}>Mais sobre nossa empresa</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    top: 10,
    paddingVertical: 0,
    alignItems: 'center',
    marginBottom: 0,
    position: 'relative',
  },
  profileImage: {
    width: 94,
    height: 94,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: -60,
  },
  name: {
    fontSize: 19,
    color: '#fff',
    marginTop: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 60,
    borderWidth: 1,
    borderColor: '#5900ff',
    borderRadius: 16,
    padding: 25,
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
    color: '#7931ff',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 40,
  },
  gradient: {
    padding: 17,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold"
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

