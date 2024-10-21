import app from '../firebaseConfig'; // Ajuste o caminho conforme necessário
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";

// Inicializa Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Tipos para as entradas
interface CompanyData {
  email: string;
  password: string;
  nome: string;
  endereco: string;
  telefone: string;
  cnpj: string;
}

interface UserData {
  email: string;
  password: string;
  nome: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
}

// Registro da empresa
export async function registerCompany({ email, password, nome, endereco, telefone, cnpj }: CompanyData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "Empresa", user.uid), {
      nome,
      cnpj,
      email,
      telefone,
      endereco,
      data_fundacao: Timestamp.now(),
    });

    console.log("Empresa registrada com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar empresa: ", error);
  }
}

// Registro do usuário
export async function registerUser({ email, password, nome, telefone, dataNascimento, cpf }: UserData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "Usuário", user.uid), {
      nome,
      cpf,
      email,
      telefone,
      data_nascimento: dataNascimento,
      // Senha não deve ser armazenada no Firestore por motivos de segurança
    });

    console.log("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário: ", error);
  }
}

