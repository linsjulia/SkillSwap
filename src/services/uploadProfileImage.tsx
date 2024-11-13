// src/services/uploadProfileImage.tsx
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

export async function selectAndUploadProfileImage() {
  try {
    // Pedir permissão para acessar as imagens
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permissão para acessar as imagens é necessária!");
      return;
    }

    // Abrir a galeria para selecionar uma imagem
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Verificar se o usuário cancelou a seleção de imagem
    if (pickerResult.canceled || !pickerResult.assets || pickerResult.assets.length === 0) {
      return;
    }

    // Obter o URI da imagem selecionada
    const imageUri = pickerResult.assets[0].uri;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Usuário não autenticado");
      return;
    }

    // Caminho no Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${user.uid}`);
    
    // Converter a imagem selecionada em blob para upload
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Fazer o upload da imagem para o Firebase Storage
    await uploadBytes(storageRef, blob);

    // Obter a URL da imagem
    const downloadURL = await getDownloadURL(storageRef);

    // Atualizar a URL da imagem de perfil no Firestore
    const db = getFirestore();

  
    const userType = user.displayName === "Empresa" ? "Empresa" : "Usuário"; 
    // Referência ao documento do usuário
    const userDocRef = doc(db, userType, user.uid);

    // Verificar se o documento do usuário já contém o campo 'profileImageUrl'
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      // Se o documento não existir, criá-lo com o campo 'profileImageUrl'
      await setDoc(userDocRef, { profileImageUrl: downloadURL }, { merge: true });
      console.log('campo profileImageUrl criado!')
    } else {
      // Se o documento já existir, apenas atualizar o campo
      await updateDoc(userDocRef, { profileImageUrl: downloadURL });
      console.log('campo profileImageUrl já existe')
    }

    alert("Foto de perfil atualizada com sucesso!");
    console.log('foto de perfil atualizada')
    return downloadURL;
  } catch (error) {
    console.error("Erro ao atualizar a foto de perfil:", error);
  }
}
