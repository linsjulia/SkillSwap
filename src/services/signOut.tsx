import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";


export const signOutUser = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.replace("/login");
      console.log('Usuário deslogado')
    } catch (error) {
      console.error("erro ao sair: ", error);
    }
  }