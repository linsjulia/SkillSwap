import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig"; // Certifique-se de importar o Firestore
import { ActivityIndicator, View } from "react-native";
import { doc, getDoc, getFirestore } from "firebase/firestore"; // Importa as funções necessárias para acessar documentos no Firestore
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function Login() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        const userId = user.uid;

        try {
          
          const empresaDocRef = doc(firestore, "Empresa", userId);
          const empresaDoc = await getDoc(empresaDocRef);

          if (empresaDoc.exists()) {
           
            router.replace("/empresa/(tabs)/home");
            console.log("Usuário pertence à coleção Empresa");
          } else {
          
            const usuarioDocRef = doc(firestore, "Usuário", userId);
            const usuarioDoc = await getDoc(usuarioDocRef);

            if (usuarioDoc.exists()) {
             
              router.replace("/(tabs)");
              console.log("Usuário pertence à coleção Usuario");
            } else {
              console.log("Usuário não pertence a nenhuma coleção válida");
              router.replace("/login");
            }
          }
        } catch (error) {
          console.error("Erro ao verificar coleção do usuário:", error);
          router.replace("/login");
        }
      } else {
        
        router.replace("/login");
        console.log("Usuário NÃO autenticado");
      }

      
      setLoading(false);
      await SplashScreen.hideAsync();
    });

    return () => unsubscribe();
  }, []);

 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return null;
}
