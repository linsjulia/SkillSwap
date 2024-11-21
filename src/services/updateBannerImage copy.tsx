// src/services/uploadBannerImage.tsx
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { useVerificarColecaoUser } from './verificarColecaoUser';

export async function selectAndUploadBannerImage() {
  try {
    // Solicita permissão para acessar a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permissão para acessar as imagens é necessária!");
      return;
    }

    // Abre a galeria para seleção de imagem
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Verifica se o usuário cancelou ou não selecionou nenhuma imagem
    if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
      return;
    }

    // Obtém o URI da imagem selecionada
    const imageUri = pickerResult.assets[0].uri;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Usuário não autenticado");
      return;
    }


    // Determina o caminho no Firebase Storage para a imagem de banner
    const storage = getStorage();
    const storageRef = ref(storage, `bannerImages/${user.uid}`);
    
    // Converte a imagem em blob para upload
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Realiza o upload da imagem para o Firebase Storage
    await uploadBytes(storageRef, blob);

    // Obtém a URL da imagem carregada
    const downloadURL = await getDownloadURL(storageRef);

    // Obtém o Firestore
    const db = getFirestore();

 
    const userType = user.displayName === "Empresa" ? "Empresa" : "Usuário";
    // Referência ao documento do usuário
    const userDocRef = doc(db, userType, user.uid);

    // Verifica se o documento do usuário já contém o campo 'bannerImageUrl'
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      // Se o documento não existir, cria com o campo 'bannerImageUrl'
      await setDoc(userDocRef, { bannerImageUrl: downloadURL }, { merge: true });
      console.log('Campo bannerImageUrl criado!');
    } else {
      // Se o documento já existir, apenas atualiza o campo
      await updateDoc(userDocRef, { bannerImageUrl: downloadURL });
      console.log('Campo bannerImageUrl atualizado!');
    }

    alert("Banner atualizado com sucesso!");
    return downloadURL;
  } catch (error) {
    console.error("Erro ao atualizar o banner:", error);
  }
}
