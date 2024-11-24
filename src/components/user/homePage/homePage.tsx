import { router, Tabs } from "expo-router"; // Importando o componente Tabs do Expo Router
import { View, Text, Image, Pressable, StyleSheet } from "react-native"; // Importando componentes básicos do React Native
import { useRouter } from 'expo-router'; 
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

function filterDesc(nameEnterprise2: string | undefined) {
  if (!nameEnterprise2) {
    return "Título indisponível"; // Valor padrão caso seja undefined
  }

  if (nameEnterprise2.length < 14) {
    return nameEnterprise2; // Se o título for menor que 14 caracteres, retorna o título completo
  }

  return `${nameEnterprise2.substring(0, 14)}...`; // Trunca o título se for maior ou igual a 14 caracteres
}

function filterDescription(description2: string | undefined) {
  if (!description2) {
    return "Descrição indisponível"; // Valor padrão caso seja undefined
  }

  if (description2.length < 148) {
    return description2; // Se a descrição for menor que 148 caracteres, retorna a descrição completa
  }

  return `${description2.substring(0, 148)}...`; // Trunca a descrição se for maior ou igual a 148 caracteres
}
interface Work {
  title2: string, // Definindo o tipo para a propriedade title
  nameEnterprise2: string, // Definindo o tipo para a propriedade nameEnterprise
  description2: string, // Definindo o tipo para a propriedade description
  image2: string,

}

// Componente que exibe um cartão com informações sobre um trabalho
export function CardWork({ title2, nameEnterprise2, description2 }: Work) {

  

  return (
   // <Pressable onPress={() => router.push({
    // pathname: '/(stack)/jobDescription',
    //  params: { title: title2, description: description2
    //   }
   // })
  //  }>
    <View
      style={{
        shadowColor: "white", // Cor da sombra
        shadowOffset: { width: -2, height: 4 }, // Deslocamento da sombra
        shadowOpacity: 0.8, // Opacidade da sombra
        shadowRadius: 5, // Raio da sombra
        backgroundColor: "#6f00ff",
        width: 270,
        height: 330,
        bottom: 58,
        left: 0,
        
      }}
      className=" rounded-2xl items-center my-6"
    >
      <Text
        style={{
         // Família da fonte
          fontWeight: 700, // Peso da fonte
          letterSpacing: 1, // Espaçamento entre letras
          top: 0,
          padding: 20,
          marginBottom: 0
        }}
        className="text-center text-white text-xl mt-3"
      >
        {title2}
      </Text>

      <View className="w-30 h-11 flex-row items-center relative right-20">
        <Image
          source={require('../../../assets/tata.png')} // Imagem a ser exibida
          resizeMode="center" // Modo de redimensionamento da imagem
          width={1000} // Largura da imagem
          height={1000} // Altura da imagem
          style={{
            bottom: 8,
          }}
        />
        <Text
          className="text-right text-white text-lg absolute left-52"
          style={{
 
            fontWeight: "bold", // Peso da fonte
            letterSpacing: 1, // Espaçamento entre letras
            top: 0,
            fontSize: 14,
            lineHeight: 28,
          }}
        >
          {filterDesc(nameEnterprise2)}
        </Text>
      </View>

      <Text
        className=" text-left text-white text-lg my-4"
        style={{
          letterSpacing: 0.5, // Espaçamento entre letras
          top: 0,
          marginLeft: 20,
          marginRight: 20,
          fontSize: 14,
          
        }}
      >
        {filterDescription(description2)}
      </Text>
    </View>

  );
}

