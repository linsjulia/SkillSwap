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
    
    // Referência ao documento do usuário
    const userDocRef = doc(db, "Usuário", user.uid); // Tentando encontrar o usuário na coleção "Usuarios"

    // Verificar se o documento do usuário existe na coleção "Usuarios" (pode ser "Empresas" ou "Usuarios")
    const userDoc = await getDoc(userDocRef);
    let userType = '';
    
    if (userDoc.exists()) {
      userType = "Usuário"; // Se encontrar na coleção "Usuarios"
    } else {
      // Caso não encontre, verifica se o usuário está na coleção "Empresas"
      const empresaDocRef = doc(db, "Empresa", user.uid);
      const empresaDoc = await getDoc(empresaDocRef);

      if (empresaDoc.exists()) {
        userType = "Empresa"; // Se encontrar na coleção "Empresas"
      } else {
        alert("Usuário não encontrado no banco de dados.");
        return;
      }
    }

    // Referência ao documento do tipo de usuário correto
    const userTypeDocRef = doc(db, userType, user.uid);

    // Verificar se o campo 'profileImageUrl' já existe
    const userTypeDoc = await getDoc(userTypeDocRef);
    if (userTypeDoc.exists()) {
      const data = userTypeDoc.data();
      if (!data.profileImageUrl) {
        // Se o campo 'profileImageUrl' não existir, cria o campo e atualiza
        await updateDoc(userTypeDocRef, { profileImageUrl: downloadURL });
        console.log("Campo 'profileImageUrl' criado e foto de perfil atualizada com sucesso!");
      } else {
        // Se o campo já existir, apenas atualiza com a nova imagem
        await updateDoc(userTypeDocRef, { profileImageUrl: downloadURL });
        alert("Foto de perfil atualizada com sucesso!");
      }
    } else {
      // Se o documento não existir, cria o documento e adiciona o campo 'profileImageUrl'
      await setDoc(userTypeDocRef, { profileImageUrl: downloadURL });
      alert("Documento criado e foto de perfil salva com sucesso!");
    }

    return downloadURL;
  } catch (error) {
    console.error("Erro ao atualizar a foto de perfil:", error);
    alert("Ocorreu um erro ao atualizar a foto de perfil. Tente novamente.");
  }
}
