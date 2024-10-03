import { router, Tabs } from "expo-router"; // Importando o componente Tabs do Expo Router
import { View, Text, Image, Pressable } from "react-native"; // Importando componentes básicos do React Native
import { useRouter } from 'expo-router'; 
import { FontAwesome } from "@expo/vector-icons";

// Função para truncar a descrição se ela for muito longa
function filterDesc(title: string) {
  if (title.length < 18) {
    return title; // Se o título for menor que 18 caracteres, retorna o título completo
  }

  return `${title.substring(0, 18)}...`; // Se o título for maior ou igual a 18 caracteres, retorna os primeiros 18 caracteres seguidos de "..."
}

interface Work {
  title: string, // Definindo o tipo para a propriedade title
  nameEnterprise: string, // Definindo o tipo para a propriedade nameEnterprise
  description: string // Definindo o tipo para a propriedade description
}

// Componente que exibe um cartão com informações sobre um trabalho
export function CardWork({ title, nameEnterprise, description }: Work) {
  return (
    <Pressable onPress={() => router.push('/jobDescription')}>
    <View
      style={{
        shadowColor: "cyan", // Cor da sombra
        shadowOffset: { width: -2, height: 4 }, // Deslocamento da sombra
        shadowOpacity: 0.8, // Opacidade da sombra
        shadowRadius: 5, // Raio da sombra
      }}
      className="bg-indigo-700 max-w-96 h-60 rounded-2xl items-center my-6"
    >
      <Text
        style={{
          fontFamily: "Inter", // Família da fonte
          fontWeight: 700, // Peso da fonte
          letterSpacing: 1, // Espaçamento entre letras
        }}
        className="text-center text-white text-2xl mt-3"
      >
        {title}
      </Text>

      <View className="w-30 h-11 flex-row items-center relative right-20">
        <Image
          source={require('../../assets/tata.png')} // Imagem a ser exibida
          resizeMode="center" // Modo de redimensionamento da imagem
          width={32} // Largura da imagem
          height={32} // Altura da imagem
        />
        <Text
          className="text-right text-white text-lg absolute left-52"
          style={{
            fontFamily: "Inter", // Família da fonte
            fontWeight: "bold", // Peso da fonte
            letterSpacing: 1, // Espaçamento entre letras
          }}
        >
          {filterDesc(nameEnterprise)}
        </Text>
      </View>

      <Text
        className="mx-4 text-left text-white text-lg my-4"
        style={{
          fontFamily: "Inter", // Família da fonte
          fontWeight: "bold", // Peso da fonte
          letterSpacing: 0.5, // Espaçamento entre letras
        }}
      >
        {description}
      </Text>
    </View>
    </Pressable>
  );
}

export function BotaoVagas(){
  return(
    <View>
      <View>
      <Pressable>

        <FontAwesome name="arrow-circle-left" size={40} color="white"></FontAwesome>

      </Pressable>
      </View>
      <View className="justify-center">
      <Pressable>

        <FontAwesome name="apple" size={40} color="white"></FontAwesome>
      </Pressable>

      </View>
    </View>
    
  );

}
