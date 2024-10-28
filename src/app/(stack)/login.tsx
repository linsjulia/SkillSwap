import { Text , View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import { InputsPassword, InputsText } from "../../components/inputText";
import { ButtonLogin, CreateAccount, ImagesEnterprise, OthersLogins, ResetPassword } from "../../components/login/loginComponets";
import { useForm, Controller } from "react-hook-form";
import { useRouter, router } from "expo-router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {

  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    email: yup.string().required("Informe seu email"),
    password: yup.string().required("Informe sua senha"),
  })

  const { control, handleSubmit, formState: { errors }, watch } = useForm<LoginFormData> ({
    resolver: yupResolver(schema),

    defaultValues: {
      email: '',
      password: '',
    }
    
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      Alert.alert("Login bem-sucedido", `Bem-vindo,  ${user.email}`);
      router.replace("/(tabs)");
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert("Erro ao fazer login", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <View className="flex-1 bg-neutral-900">
      <Text className=" py-9 text-4xl ml-12 relative top-7 text-indigo-500" style={{ fontWeight: "bold",}} > Login </Text>
      <View className="flex-1 items-center mt-11">

        <Controller 
          control = {control}
          rules= {{
            required: true,
          }}
          render={({ field: {  onChange, onBlur, value } }) => (
            <InputsText 
            style={[
              styles.input, {
              borderWidht: errors.email && 1,
              borderColor: errors.email && '#ff0533',
              }
            ]}
            placaholder="Email:"
            onBlur = {onBlur}
            onChangeText={onChange}
            value={value}
            />  
          )}
          name='email'
        />
        {errors.email && <Text style={styles.labelError} className="color-red-600">{errors.email?.message}</Text>}

        <Controller
          control = {control}
          rules ={{
            required: true,
      
          }}
          render={({ field: { onChange, onBlur, value }}) => (
            <InputsPassword 
            style={[
              styles.input, {
              borderWidht: errors.password && 1,
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
          {errors.password && <Text style={styles.labelError} className="color-red-600">{errors.password?.message}</Text>}
          {loading && <ActivityIndicator size='large' color="#4c00fff" style={{ marginTop: 20 }} />}
      <ButtonLogin text="Login" onPress={handleSubmit(onSubmit)}/>
   

      <ResetPassword/>
      <OthersLogins/>
      <ImagesEnterprise/>
       <CreateAccount /> 
      </View>
    </View>
  );
}



const styles = StyleSheet.create({


  labelError:{
    alignSelf: 'flex-start',
    color: 'red',
    marginBottom: 10,
    marginLeft: 30,
  },

  input: {
    borderWidth: 1,

  }

})