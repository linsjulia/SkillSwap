import { Text, View, StyleSheet, Alert, ActivityIndicator, ScrollView } from "react-native";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig"; // Importando `auth` da configuração inicializada
import { useRouter } from "expo-router";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { InputsPassword, InputsText } from "../components/inputText";
import { ButtonLogin, CreateAccount, ImagesEnterprise, OthersLogins, ResetPassword } from "../components/login/loginComponets";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = yup.object({
    email: yup.string().required("Informe seu email"),
    password: yup.string().required("Informe sua senha"),
  });

  const { control, handleSubmit, formState: { errors }, watch } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

    async function verificarColecaoUsuario(user: { uid: string | undefined; }) {
  
    const userDocRef = doc(collection(db, 'Usuário'), user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log('Usuário encontrado na coleção Usuário');
      router.replace("/(tabs)");
    } else {
      const empresaDocRef = doc(collection(db, 'Empresa'), user.uid);
      const empresaDoc = await getDoc(empresaDocRef);

      if (empresaDoc.exists()) {
        console.log('Usuário encontrado na coleção Empresa');
        router.replace("/empresa/(tabs)/home");
      } else {
        console.log('Usuário não encontrado em nenhuma coleção');
      }
    }

    return;
  }


  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      await verificarColecaoUsuario(user);
      Alert.alert("Login bem-sucedido", `Bem-vindo, ${user.email}`);
  

    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert("Erro ao fazer login", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <ScrollView style={{ backgroundColor: "black" }} className="flex-1 bg-neutral-900">
      <Text className="py-9 text-4xl ml-12 relative top-7" style={{ fontWeight: "bold", color: "#7c5fff", bottom: 80 }}>Login</Text>
      
      <View className="flex-1 items-center mt-11">
        <Controller 
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputsText
              style={[
                styles.input, {
                borderWidth: errors.email && 1,
                borderColor: errors.email && '#ff0533',
                }
              ]}
              placaholder="Email:"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='email'
        />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputsPassword
              style={[
                styles.input, {
                borderWidth: errors.password && 1,
                borderColor: errors.password && '#ff0000',
                }
              ]}
              placaholder="Senha:"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name='password'
        />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}
        
        {loading && <ActivityIndicator size='large' color="#4c00fff" style={{ marginTop: 20 }} />}
        
        <ButtonLogin text="Entrar" onPress={handleSubmit(onSubmit)} />
        <ResetPassword />
        <OthersLogins />
        <ImagesEnterprise />
        <CreateAccount />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff0000',
    marginBottom: 10,
    marginLeft: 30,
  },
  input: {
    borderWidth: 1,
  }
});
