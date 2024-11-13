// deleteImages.tsx
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const storage = getStorage();
const db = getFirestore();
const auth = getAuth();

async function getUserCollection(userId: string): Promise<"Empresa" | "Usuário" | null> {
  const empresaDoc = await getDoc(doc(db, "Empresa", userId));
  if (empresaDoc.exists()) {
    return "Empresa";
  }

  const candidatoDoc = await getDoc(doc(db, "Usuário", userId));
  if (candidatoDoc.exists()) {
    return "Usuário";
  }

  return null;

}

export async function deleteProfileImage() {
  const user = auth.currentUser;

  if (!user) {
    console.error("Nenhum usuário está logado.");
    return;
  }

  const userCollection = await getUserCollection(user.uid);
  if (!userCollection) {
    console.error("Usuário não encontrado nas coleções Empresa ou Candidato.");
    return;
  }

  try {
    const profileImageRef = ref(storage, `${userCollection}/${user.uid}/profileImage.jpg`);
    await deleteObject(profileImageRef);

    const userDoc = doc(db, userCollection, user.uid);
    await updateDoc(userDoc, {
      profileImageUrl: null
    });

    console.log("Foto de perfil excluída com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir a foto de perfil:", error);
  }
}

export async function deleteBannerImage() {
  const user = auth.currentUser;

  if (!user) {
    console.error("Nenhum usuário está logado.");
    return;
  }

  const userCollection = await getUserCollection(user.uid);
  if (!userCollection) {
    console.error("Usuário não encontrado nas coleções Empresa ou Candidato.");
    return;
  }

  try {
    const bannerImageRef = ref(storage, `${userCollection}/${user.uid}/bannerImage.jpg`);
    await deleteObject(bannerImageRef);

    const userDoc = doc(db, userCollection, user.uid);
    await updateDoc(userDoc, {
      bannerImageUrl: null
    });

    console.log("Banner excluído com sucesso!");
  } catch (error) {
    console.error("Erro ao excluir o banner:", error);
  }
}