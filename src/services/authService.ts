import  app  from '../../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { Alert } from 'react-native';

const auth = getAuth();
const db = getFirestore(app);

// Tipos para as entradas
interface CompanyData {
  email: string;
  password: string;
  nome: string;
  telefone: string;
  cnpj: string;
  localizacao: string;
}

interface UserData {
  email: string;
  password: string;
  nome: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  localizacao: string;

}

// Registro da empresa
export async function registerCompany({ email, password, nome, telefone, cnpj, localizacao }: CompanyData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "Empresa", user.uid), {
      nome,
      cnpj,
      email,
      telefone,
      localizacao,
      data_fundacao: Timestamp.now(),
    });

    console.log("Empresa registrada com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar empresa: ", error);
  }
}

// Registro do usuário
export async function registerUser({ email, password, nome, telefone, dataNascimento, cpf, localizacao }: UserData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "Usuário", user.uid), {
      nome,
      cpf,
      email,
      telefone,
      localizacao,
      data_nascimento: dataNascimento,

      // Senha não deve ser armazenada no Firestore por motivos de segurança
    });

    console.log("Usuário registrado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {

      Alert.alert("Erro ao registrar usuário: ", error.message);
    } else {
      Alert.alert("Erro ao registrar o usuário (string)", String(error));
    }
  }
}

