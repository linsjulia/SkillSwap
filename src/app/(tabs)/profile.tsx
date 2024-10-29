import { ExitButton, InfoProfile, ReadOnlyInput, SaveButton } from "@/src/components/user/profile/profileComponents";
import { UserLogo } from "@/src/components/user/profile/User";
import { router } from "expo-router";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { getAuth, User, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, firestore } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';





export interface UserProfile {
  nome: string;
  email: string;
  data_nascimento: string;
  profileImageURL?: string; 
}


export default function Profile({nome, email, data_nascimento}:UserProfile) {
  const [UserProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);


  const getUserProfile = async (setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null >>) => {
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

  if (!UserProfile) return 

  // método do signOut
  const signOutUser = async () => {
    const auth = getAuth();
    try{
      await signOut(auth);
      router.replace("/login");
      console.log('Usuário deslogado')

    } catch (error) {
      console.error("erro ao sair: ", error);
    }
  }



  return (

    <ScrollView className="flex-1  bg-zinc-900">
      <Image
        source={require("../../assets/banner.png")}
        className="w-full h-52 -mb-14"
        />
      <UserLogo title="Usuário"/>
      <Text className="text-white font-bold text-2xl mt-4 text-center">{UserProfile.nome}</Text>
      
      <View>
      <Text
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1,
        }}
        className="text-center text-white text-xl  mt-5"
      >
        Nome:
      </Text>
      <View className="flex-1 px-4 pb-4 items-center -mt-4">
        <ReadOnlyInput placaholder={UserProfile.nome} />
      </View>
      <Text
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1,
        }}
        className="text-center text-white text-xl -mt-4 mb-3"
      >
        E-mail:
      </Text>
      <View className="flex-1 px-4 pb-4 items-center -mt-5">
        <ReadOnlyInput placaholder={UserProfile.email} />
      </View>
      <Text
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1,
        }}
        className="text-center text-white text-xl  -mt-4 mb-3"
      >
        Data de nascimento:
      </Text>
      <View className="flex-1 px-4 pb-4 items-center -mt-4">
        <ReadOnlyInput placaholder={UserProfile.data_nascimento} />
      </View>
    </View>
      <View className="items-center -mt-3 mb-3">
      <SaveButton onPress={() => {} }  text="Salvar alteracoes" />
      <ExitButton onPress={() => {signOutUser()}} text="Sair"></ExitButton>
        </View>
      </ScrollView>
  );
}
