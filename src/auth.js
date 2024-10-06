import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { app } from './firebase'; 

const auth = getAuth(app);

// Registrar usuário
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Redefinir senha
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Email de redefinição de senha enviado!";
  } catch (error) {
    throw error;
  }
};
