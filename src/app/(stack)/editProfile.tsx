import { router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, Pressable, ActivityIndicator, Linking } from "react-native";
import { getAuth} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import { selectAndUploadProfileImage } from "@/src/services/uploadProfileImage";
import { selectAndUploadBannerImage } from "@/src/services/updateBannerImage";
import { Picker } from "@react-native-picker/picker";
import { useForm } from "react-hook-form";
import React from "react";


export interface UserProfile {
  curriculo: string;
  nome: string;
  email: string;
  data_nascimento: string;
  portfolio?: { url: string; description: string };
  area_atuacao: string;
  telefone: string;
  resumo: string;
}

interface LoadingOverlayProps {
  visible: boolean;
}

export default function Profile({ nome, email, data_nascimento, portfolio, area_atuacao, telefone, curriculo, resumo }: UserProfile) {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [newNome, setNewNome] = useState(nome || ""); // Inicializar como string vazia
  const [newEmail, setNewEmail] = useState(email || "");
  const [newTelefone, setNewTelefone] = useState(telefone || "");
  const [newDataNascimento, setNewDataNascimento] = useState(data_nascimento || "");
  const [newPortfolioUrl, setNewPortfolioUrl] = useState(portfolio?.url || "");
  const [newPortfolioDescription, setNewPortfolioDescription] = useState(portfolio?.description || "");
  const [newCurriculoUrl, setNewCurriculoUrl] = useState(curriculo || "");
  const [newAreaAtuacao, setNewAreaAtuacao] = useState(area_atuacao || "");
  const [newResumo, setNewResumo] = useState(resumo || "");
  const [loading, setLoading] = useState(false);
  const firestore = getFirestore();
  const [loadingData, setLoadingData] = useState(true);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingProfileImage, setLoadingProfileImage] = useState(false);
  

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: nome || "",
      email: email || "",
      telefone: telefone || "",
      data_nascimento: data_nascimento || "",
      portfolioUrl: portfolio?.url || "",
      portfolioDescription: portfolio?.description || "",
      curriculo: curriculo || "",
      area_atuacao: area_atuacao || "",
      resumo: resumo || "",
    },
  });


  useEffect(() => {
    const fetchUserProfileBannerImage = async () => {
      setLoadingData(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userDocRef = doc(db, 'Usuário', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setProfileImageUrl(userDoc.data()?.profileImageUrl || null);
        setBannerImageUrl(userDoc.data()?.bannerImageUrl || null);
      }
      setLoadingData(false);
    };

    fetchUserProfileBannerImage();
  }, []);

  const handleProfileImageUpdate = async () => {
    setLoadingProfileImage(true);
    const newImageUrl = await selectAndUploadProfileImage();
    if (newImageUrl) {
      setProfileImageUrl(newImageUrl);
    }
    setLoadingProfileImage(false);
  };

  const handleBannerUpdate = async () => {
    setLoadingBanner(true);
    const newBannerUrl = await selectAndUploadBannerImage();
    if (newBannerUrl) {
      setBannerImageUrl(newBannerUrl);
    }
    setLoadingBanner(false);
  };


  useEffect(() => {
    const getUserProfile = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        const docRef = doc(firestore, 'Usuário', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setUserProfile(data);

          if (data.portfolio) {
            setNewPortfolioUrl(data.portfolio.url || "");
            setNewPortfolioDescription(data.portfolio.description || "");
          }
          if (data.curriculo) {
            setNewCurriculoUrl(data.curriculo || "");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário", error);
      }
    };

    getUserProfile();
  }, []);


  const saveProfile = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;

  
  const isAnyFieldFilled = [
    newNome?.trim(),
    newEmail?.trim(),
    newTelefone?.trim(),
    newDataNascimento?.trim(),
    newPortfolioUrl?.trim(),
    newPortfolioDescription?.trim(),
    newCurriculoUrl?.trim(),
    newAreaAtuacao?.trim(),
    newResumo?.trim(),
  ].some((field) => field && field !== "");

  if (!isAnyFieldFilled) {
    alert("No mínimo um campo precisa estar preenchido para salvar.");
    return; 
  }

  try {
    setLoading(true);

    const userDocRef = doc(firestore, "Usuário", userId);

    const updatedFields: Partial<UserProfile> = {};
    if (newNome?.trim()) updatedFields.nome = newNome.trim();
    if (newEmail?.trim()) updatedFields.email = newEmail.trim();
    if (newTelefone?.trim()) updatedFields.telefone = newTelefone.trim();
    if (newDataNascimento?.trim()) updatedFields.data_nascimento = newDataNascimento.trim();
    if (newPortfolioUrl?.trim() || newPortfolioDescription?.trim()) {
      updatedFields.portfolio = {
        url: newPortfolioUrl.trim() || "",
        description: newPortfolioDescription.trim() || "",
      };
    }
    if (newCurriculoUrl?.trim()) updatedFields.curriculo = newCurriculoUrl.trim();
    if (newAreaAtuacao?.trim()) updatedFields.area_atuacao = newAreaAtuacao.trim();
    if(newResumo?.trim()) updatedFields.resumo = newResumo.trim();

    await updateDoc(userDocRef, updatedFields);

    // Atualizar o estado local do perfil
    setUserProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...updatedFields,
      };
    });

    setLoading(false);
    alert("Informações atualizadas com sucesso!");
  } catch (error) {
    setLoading(false);
    console.error("Erro ao salvar perfil", error);
    alert("Erro ao salvar as informações. Tente novamente.");
  }
};

  

  if (!userProfile) return <ActivityIndicator size="large" color="#894aff" />;

  const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
    if (!visible) return null;

    return (
      <View style={styles.overlayLoading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LoadingOverlay visible={loadingData || loadingBanner || loadingProfileImage} />


      <Pressable onPress={handleBannerUpdate}>
      <Image
        source={bannerImageUrl ? { uri: bannerImageUrl } : require('../../assets/banner.png')}
        style={{ height: 130, padding: 0 }}
      />
      </Pressable>
  

      <View style={{ display: 'flex', flexDirection: 'row', gap: 270, left: 30, top: 50 }}>
        <Pressable onPress={handleProfileImageUpdate}>
          <Icon name="pencil" size={30} color="#fff" />
        </Pressable>

        <Pressable onPress={() => { router.replace('/(stack)/settings'); }}>
          <Icon name="settings-outline" size={26} color="#fff" />
        </Pressable>
      </View>

      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <Image
          source={profileImageUrl ? { uri: profileImageUrl } : require('../../assets/user.png')}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{userProfile.nome}</Text>
        <Text style={styles.roleText}>Candidato</Text>
      </View>

      {/* Form to edit profile */}
      <View style={styles.formContainer}>
        {/* Nome */}
        
        <Text style={styles.label}>Nome</Text>
        <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newNome}
          onChangeText={setNewNome}
          placeholderTextColor={'white'}
          placeholder={userProfile?.nome || 'Digite seu nome'} 
        /> 
        </View>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          placeholderTextColor="white"
          placeholder={userProfile?.email || 'Digite seu email'} 
        />
        </View>

        <Text style={styles.label}>Telefone</Text>
        <View style={styles.inputContainer}>
        <Icon name="call-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newTelefone}
          onChangeText={setNewTelefone}
          placeholderTextColor="white"
          placeholder={userProfile?.telefone || 'Digite seu telefone'} 
        />
        </View>


        {/* Data de Nascimento */}
        <Text style={styles.label}>Data de Nascimento</Text>
        <View style={styles.inputContainer}>
        <Icon name="calendar-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newDataNascimento}
          onChangeText={setNewDataNascimento}
          placeholderTextColor="white"
          placeholder={userProfile?.data_nascimento || 'Digite sua data de nascimento'} 
        />
        </View>


        <Text style={styles.label}>Área de Atuação</Text>
        <View style={styles.inputContainer}>
        <Icon name="briefcase-outline" size={20} color="#ffffff" style={styles.icon} />
        <Picker
        selectedValue={newAreaAtuacao}
        onValueChange={(itemValue: React.SetStateAction<string>) => setNewAreaAtuacao(itemValue)}
        style={styles.picker}
        
        >
          
          <Picker.Item label="Selecione sua área de atuação" value="" color="#000000" />
          <Picker.Item label="Desenvolvimento de Software" value="Desenvolvimento de Software" color="#000000" />
          <Picker.Item label="Desenvolvimento Web e E-commerce" value="Desenvolvimento Web e E-commerce" color="#000000" />
          <Picker.Item label="Gestão e Análise de Dados" value="Gestão e Análise de Dados" color="#000000" />
          <Picker.Item label="Infraestrutura e Redes" value="Infraestrutura e Redes" color="#000000" />
          <Picker.Item label="Segurança da Informação" value="Segurança da Informação" color="#000000" />
          <Picker.Item label=" UX/UI Design" value="UX/UI Design" color="#000000" />
          <Picker.Item label=" Engenharia de Machine Learning" value="Engenharia de Machine Learning " color="#000000" />
          </Picker>
          </View>
          

          <Text style={styles.label}>Sobre você</Text>
          <View style={styles.inputContainer}>
          <Icon name="pencil" size={20} color="#ffffff" style={styles.icon}/>
          <TextInput
            style={styles.input}
            value={newResumo}
            onChangeText={setNewResumo}
            placeholderTextColor="white"
            placeholder={userProfile?.resumo || 'Digite uma descrição sobre você'}
            multiline={true} 
          />
          </View>

        <Text style={styles.label}>Link do Currículo</Text>
        <View style={styles.inputContainer}>
        <Icon name="link-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          // value={newCurriculoUrl}
          onChangeText={setNewCurriculoUrl}
          placeholderTextColor="white"
          placeholder={userProfile?.curriculo || 'Digite o link do seu currículo'} 
        />
        </View>


        {/* Link do Portfólio */}
        <Text style={styles.label}>Link do Portfólio</Text>
        <View style={styles.inputContainer}>
        <Icon name="link-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newPortfolioUrl}
          onChangeText={setNewPortfolioUrl}
          placeholderTextColor="white"
          placeholder={userProfile?.portfolio?.url || 'Digite o link do seu portfólio'}
        />
        </View>

        {/* Link do Currículo */}
        <View>
        <Text style={styles.sectionTitle}>Imagem de seu Portfólio</Text>
        <View style={styles.portfolioBox} />
      </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile} disabled={loading}>
          <Text style={styles.saveButtonText}>
            {loading ? "Salvando..." : "Salvar Informações"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    marginLeft: 20,
    color: '#ffffff', 
    
  },

  container: {
    flex: 1,
    backgroundColor: '#111',
    
  },
  overlay: {
    position: 'absolute',
    zIndex: 10, 
    top: 0, 
    left: 319, 
    right: 0, 
    bottom: 1160, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  icon: {
    left: 16,
    bottom: 3,
  },

  headerText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: 55,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#00a2ff',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    bottom: 40,
  },
  roleText: {
    fontSize: 16,
    color: '#fff',
    bottom: 40,
  },
  formContainer: {
    backgroundColor: '#7700ff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 32,
    borderRadius: 0,
    
    bottom: 20,
    margin: 10
    
  },
  label: {
    fontSize: 15,
    color: '#ffffff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380077',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#464646',
    marginBottom: 20,
    paddingBottom: 0,
    color: 'white',
    padding: 5,
    
  },
  input: {
    flex: 1,
    marginLeft: 30,
    fontSize: 14,
    color: '#ffffff',
    padding: 0,
    height: 37,
    bottom: 3,   
  },

  overlayLoading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  saveButton: {
    backgroundColor: "#00a2ff",
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 4, 
    elevation: 3, 
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  portfolioLink: {
    color: "#00a2ff",
    textDecorationLine: "underline",
    fontSize: 14,
    marginBottom: 25,
    top: 13,
    textAlign: 'center',
    left: 30,
  },
  emptyPortfolioText: {
    color: "#ffffff",
    fontSize: 14,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    marginTop: 10,

  },
  sectionContent: {
    fontSize: 16,
    color: '#ffffff',
    backgroundColor: "#6200ff",
    padding: 20,
    borderRadius: 10,
    margin: 10
  },
  portfolioBox: {
    backgroundColor: '#12133f', 
    height: 180,
    margin: 0,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#0004ff"
  },
});