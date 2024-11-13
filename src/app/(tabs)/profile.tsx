import { ExitButton, InfoProfile, ReadOnlyInput, SaveButton } from "@/src/components/user/profile/profileComponents";
import { UserLogo } from "@/src/components/user/profile/User";
import { router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from "react-native";
import { getAuth, User, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';
import Icon from "react-native-vector-icons/Ionicons";
import { selectAndUploadProfileImage } from "@/src/services/uploadProfileImage";
import { selectAndUploadBannerImage } from "@/src/services/updateBannerImage";
export interface UserProfile {
  nome: string;
  email: string;
  data_nascimento: string;
  profileImageURL?: string; 
  site: string;
}

interface LoadingOverlayProps {
  visible: boolean; // Define o tipo como boolean
}

export default function Profile({nome, email, data_nascimento}:UserProfile) {
  const [ profileImageUrl, setProfileImageUrl ] = useState<string | null>(null);
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [UserProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const firestore = getFirestore();
  const [loadingData, setLoadingData] = useState(true);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const [loadingProfileImage, setLoadingProfileImage] = useState(false);

  
  useEffect(() => {
    const fetchUserProfileBannerImage = async () => {
      setLoadingData(true)
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
      setLoadingData(false)
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

  if (!UserProfile) return <ActivityIndicator size="large" color="#894aff" />;

  const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
    if (!visible) return null; // Retorna null se não for visível
  
    return (
      <View style={styles.overlayLoading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };
  

  return (

    <View style={styles.container}>
      <LoadingOverlay visible={loadingData || loadingBanner || loadingProfileImage}/> 
    
    <Image
      source={bannerImageUrl ? { uri: bannerImageUrl } : require('../../assets/banner.png')}
      style={{ height: 80, padding: 0,  }}
      />

    <Pressable style={styles.overlay} onPress={handleBannerUpdate}>
      <Icon name="pencil" size={30} color='#fff' />
    </Pressable>

    <View style={{ display: 'flex', flexDirection: 'row', gap: 300, left: 13, top: 30, }}>
    <Pressable onPress={handleProfileImageUpdate}>
      <Icon name="pencil" size={30} color='#fff'></Icon>
    </Pressable>
        

    <Pressable onPress={() => {router.replace('/(stack)/settings')}}>
        <Icon name="settings-outline" size={26} color="#fff"/>
      </Pressable>
    </View>
    {/* Profile Information */}
    <View style={styles.profileContainer}>
    {profileImageUrl ? (
      <Image
        source={{ uri: profileImageUrl }}
        style={styles.profileImage}
      /> ) : (
        <Text></Text>
      )}

      <Text style={styles.nameText}>{UserProfile.nome}</Text>
      <Text style={styles.roleText}>Candidato</Text>
    </View>

    {/* Form */}
    <View style={styles.formContainer}>
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={UserProfile.email}
          editable={false}
        />
      </View>

      <Text style={styles.label}>Website</Text>
      <View style={styles.inputContainer}>
        <Icon name="link-outline" size={20} color="#ffffff" style={styles.icon}/>
        <TextInput
          style={styles.input}
          placeholder=""
          value={UserProfile.site}
          editable={false}
        />
      </View>

      <Text style={styles.label}>Data de nascimento</Text>
      <View style={styles.inputContainer}>
        <Icon name="calendar-outline" size={20} color="#ffffff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder=""
          value=""
          editable={false}
        />
      </View>
    </View>
 
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    
  },
  overlay: {
    position: 'absolute',
    zIndex: 10, 
    top: 0, 
    left: 339, 
    right: 0, 
    bottom: 530, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  icon: {
    left: 16,
    top: 2,
  },

  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 20,
  //   marginBottom: 20,
  // },
  headerText: {
    color: '#fff',
    fontSize: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    bottom: 40,
  },
  roleText: {
    fontSize: 16,
    color: '#fff',
    bottom: 33,
  },
  formContainer: {
    backgroundColor: '#8c00ff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    borderRadius: 0,
    height: 395,
    bottom: 27,
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
    paddingBottom: 4,
    color: 'white',
    padding: 0,
  },
  input: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
    color: '#ffffff',
    padding: 10,
    height: 40,
    top: 1,
    
  },

  overlayLoading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  
});
