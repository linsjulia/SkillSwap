import { ScrollView, Pressable, Text, View, Image, Button } from "react-native"; // Importando componentes do React Native
import { router, useRouter } from "expo-router"; // Importando funções de roteamento do Expo Router
import React from 'react'; // Importando o React
import LinearGradient from 'react-native-linear-gradient';
import { Route } from "@react-navigation/native"; // Importando o tipo Route do React Navigation
import { useForm, Controller } from 'react-hook-form'

// Definindo a interface para o componente ButtonLogin
export interface TextButton {
  text: string; // Propriedade de texto do botão
  onPress: () => void;
  
}

// Componente de botão de login
export function ButtonLogin({ text, onPress }: TextButton) {
  return (
    
    <Pressable
      className="text-gray-300 border bg-indigo-600 border-indigo-600 w-96 rounded-full h-14 mt-8 flex items-center justify-center"
      onPress={onPress}// Navegando para a rota "/(tabs)" ao pressionar o botão
    >
      <Text
        className="text-white text-2xl"
        style={{
          fontFamily: "Inter", // Família da fonte
          fontWeight: "700", // Peso da fonte
          letterSpacing: 1.5, // Espaçamento entre letras
          shadowColor: "cyan", // Cor da sombra
          shadowOffset: { width: -2, height: 4 }, // Deslocamento da sombra
          shadowOpacity: 0.4, // Opacidade da sombra
          shadowRadius: 3, // Raio da sombra
        }}
      >
        {text} {/* Exibindo o texto do botão */}
      </Text>
    </Pressable>
  );
}

// Componente para o link de redefinição de senha
export function ResetPassword() {
  return (
    <Pressable>
      <Text
        className="text-gray-300 ml-48 mt-5"
        style={{
          fontFamily: "Inter", // Família da fonte
          fontWeight: "700", // Peso da fonte
          letterSpacing: 1.3, // Espaçamento entre letras
        }}
      >
        Esqueceu sua senha? 
      </Text>
    </Pressable>
  );
}

// Componente para o texto "ou logue com"
export function OthersLogins() {
  return (
    <Pressable className="mt-16">
      <Text
        className="text-gray-300 text-center"
        style={{ fontFamily: "", fontWeight: "700", letterSpacing: 1.3 }}
      >
        ou logue com
      </Text>
    </Pressable>
  );
}

// Componente para exibir imagens de empresas
export function ImagesEnterprise() {
  return (
    
    <View className="flex-row gap-10 items-center">
      <Pressable className="mt-3 bg-neutral-800 py-3 px-8 rounded-xl">
        <Image source={require("../../assets/google.png")} />
      </Pressable>
      <Pressable className="mt-3 bg-neutral-800 py-3 px-8 rounded-xl">
        <Image source={require("../../assets/linkedin.png")} /> 
      </Pressable>
      <Pressable className="mt-3 bg-neutral-800 py-3 px-8 rounded-xl">
        <Image source={require("../../assets/github.png")} /> 
      </Pressable>
    </View>
  );
}

// Componente para criar uma nova conta
export function CreateAccount() {
  const router = useRouter(); // Obtendo o roteador

  return (
    <View className="flex-row gap-10 items-center">
      <Pressable
        className="flex-grid"
        onPress={() => router.replace('/register')} // Navegando para a rota "/register" ao pressionar
      >
        <Text
          style={{
            fontFamily: "", // Família da fonte
            fontWeight: "700", // Peso da fonte
            letterSpacing: 1.3, // Espaçamento entre letras
          }}
          className="text-gray-300 text-center mt-10"
        >
          Nao possui conta? {/* Texto para usuários sem conta */}
        </Text>
        <Text
          className="text-indigo-400 text-center mt-2"
          style={{
            fontFamily: "", // Família da fonte
            fontWeight: "700", // Peso da fonte
            letterSpacing: 1.3, // Espaçamento entre letras
          }}
        >
          Crie aqui!
        </Text>
      </Pressable>
    </View>
  );
}
