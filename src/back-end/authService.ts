import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";

// tipos para as entradas
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
  dataNascimento: Date;
  cpf: string;
  senha: string; 
}

const auth = getAuth();
const db = getFirestore();

// Registro da empresa
async function registerCompany({ email, password, nome, endereco, telefone, cnpj }: CompanyData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "empresas", user.uid), {
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
async function registerUser({ email, password, nome, telefone, dataNascimento, cpf, senha }: UserData) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      nome,
      cpf,
      email,
      telefone,
      data_nascimento: dataNascimento,
      senha,
    });

    console.log("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário: ", error);
  }
}
