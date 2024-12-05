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

  nome: string;
  email: string;
  area_atuacao: string;
  website: string;
  localizacao: string;
  resumo: string;
  cnpj: string;
 
}

interface LoadingOverlayProps {
  visible: boolean;
}

export default function ProfileEmpresa({ nome, email, area_atuacao, website, localizacao, resumo, cnpj }: UserProfile) {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [newNome, setNewNome] = useState(nome || ""); // Inicializar como string vazia
  const [newEmail, setNewEmail] = useState(email || "");
  const [newAreaAtuacao, setNewAreaAtuacao] = useState(area_atuacao || "");
  const [newWebsite, setNewWebsite] = useState(website || "");
  const [newLocalizacao, setNewLocalizacao] = useState(localizacao || "");
  const [newResumo, setNewResumo] = useState(resumo || "");
  const [newCnpj, setNewCnpj] = useState(cnpj || "");
  const [loading, setLoading] = useState(false);
  const firestore = getFirestore();
  const [loadingData, setLoadingData] = useState(true);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingProfileImage, setLoadingProfileImage] = useState(false);
  

  const {
    reset,
  } = useForm({
    defaultValues: {
      nome: nome || "",
      email: email || "",
      website: website || "",  
      area_atuacao: area_atuacao || "",
      localizacao: localizacao || "",
      resumo: resumo || "",
      cnpj: cnpj || "",
    },
  });


  useEffect(() => {
    const fetchUserProfileBannerImage = async () => {
      setLoadingData(true);
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const userDocRef = doc(db, 'Empresa', user.uid);
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
        const docRef = doc(firestore, 'Empresa', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setUserProfile(data);

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
      newWebsite.trim(),
      newAreaAtuacao?.trim(),
      newLocalizacao?.trim(),
      newResumo?.trim(),
      newCnpj?.trim(),
    ].some((field) => field && field !== "");
  
    if (!isAnyFieldFilled) {
      alert("No mínimo um campo precisa estar preenchido para salvar.");
      return; 
    }
  
    try {
      setLoading(true);
  
      const userDocRef = doc(firestore, "Empresa", userId);
  
      const updatedFields: Partial<UserProfile> = {};
      if (newNome?.trim()) updatedFields.nome = newNome.trim();
      if (newEmail?.trim()) updatedFields.email = newEmail.trim();
      if (newWebsite?.trim()) updatedFields.website = newWebsite.trim();
      if (newAreaAtuacao?.trim()) updatedFields.area_atuacao = newAreaAtuacao.trim();
      if (newLocalizacao?.trim()) updatedFields.localizacao = newLocalizacao.trim();
      if (newResumo?.trim()) updatedFields.resumo = newResumo.trim();
      if (newCnpj?.trim()) updatedFields.cnpj = newCnpj.trim();  
      await updateDoc(userDocRef, updatedFields);
  
      // Atualizar o estado local do perfil
      setUserProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          ...updatedFields,
        };
      });
  
      // Limpar os campos de entrada usando reset
      
  
      setLoading(false);
      alert("Informações atualizadas com sucesso!");

      reset({
        nome: "",
        email: "",
        website: "",
        area_atuacao: "",
        localizacao: "",
        resumo: "",
        cnpj: ""
      });
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

      <Pressable  onPress={handleBannerUpdate}>
        
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
        <Text style={styles.roleText}>{userProfile.area_atuacao}</Text>
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
          placeholderTextColor="#c2c0c0"
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
          placeholderTextColor="#c2c0c0"
          placeholder={userProfile?.email || 'Digite seu email'} 
        />
        </View>


           
        <Text style={styles.label}>CNPJ</Text>
        <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newCnpj}
          onChangeText={setNewCnpj}
          placeholderTextColor="#c2c0c0"
          placeholder={userProfile?.cnpj || 'Digite seu CPF'} 
        />
        </View>



        <Text style={styles.label}>Localização</Text>
        <View style={styles.inputContainer}>
        <Icon name="location-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newLocalizacao}
          onChangeText={setNewLocalizacao}
          placeholderTextColor="#c2c0c0"
          placeholder={userProfile?.localizacao || 'Digite sua localização'} 
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
          <Picker.Item label="Varejo" value="Varejo" color="#000000" />
          <Picker.Item label="Logística e Transporte" value="Logística e Transporte" color="#000000" />
          <Picker.Item label="Design e Criatividade" value="Design e Criatividade" color="#000000" />
          <Picker.Item label="Marketing e Vendas" value="Marketing e Vendas" color="#000000" />
          <Picker.Item label="Finanças e Negócios" value="Finanças e Negócios" color="#000000" />
          <Picker.Item label=" Educação" value="Educação" color="#000000" />
          <Picker.Item label=" Tecnologia e Inovação" value="Tecnologia e Inovação" color="#000000" />
          <Picker.Item label=" Sustentabilidade e Meio Ambiente" value="Sustentabilidade e Meio Ambienteo" color="#000000" />
          <Picker.Item label=" Alimentos e Bebidas" value="Alimentos e Bebidas" color="#000000" />
          <Picker.Item label="Turismo e Entretenimento" value="Turismo e Entretenimento" color="#000000" />
          </Picker>
          </View>

          <Text style={styles.label}>Sobre você</Text>
          <View style={styles.inputContainer}>
          <Icon name="pencil" size={20} color="#ffffff" style={styles.icon}/>
          <TextInput
            style={styles.inputResumo}
            value={newResumo}
            onChangeText={setNewResumo}
            placeholderTextColor="#c2c0c0"
            placeholder={userProfile?.resumo || 'Digite uma descrição sobre sua empresa'}
            multiline={true} 
          />
          </View>




        <Text style={styles.label}>Link do website</Text>
        <View style={styles.inputContainer}>
        <Icon name="link-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          value={newWebsite}
          onChangeText={setNewWebsite}
          placeholderTextColor="#c2c0c0"
          placeholder={userProfile?.website || 'Digite o link do seu website'} 
        />
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
    color: "#c2c0c0",
    height: 55,
  },

  container: {
    flex: 1,
    backgroundColor: '#111',
    
  },
  overlay: {
    
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
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
    bottom: 65,
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
    backgroundColor: '#32157a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 32,
    borderRadius: 0,
    borderColor: "#6200ff",
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
    backgroundColor: '#4720ac',
    borderWidth: 1,
    borderColor: "#6200ff",
    borderRadius: 10,
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

  inputResumo: {
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
    backgroundColor: "#00c3ff",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    shadowColor: '#00bcf5', 
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
