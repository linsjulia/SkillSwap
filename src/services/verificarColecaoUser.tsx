import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


export function useVerificarColecaoUser() {
  const [userType, setUserType] = useState<"Empresa" | "Usuário" | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        // Verifica se o usuário está na coleção `Empresa`
        const empresaDoc = await getDoc(doc(db, 'Empresa', user.uid));
        if (empresaDoc.exists()) {
          setUserType('Empresa');
          setUserData(empresaDoc.data());
        } else {
          // Se não, verifica na coleção `Usuário`
          const candidatoDoc = await getDoc(doc(db, 'Usuário', user.uid));
          if (candidatoDoc.exists()) {
            setUserType('Usuário');
            setUserData(candidatoDoc.data());
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };


    fetchUserData();
  }, [auth, db]); 

  return { userType, userData };
}
