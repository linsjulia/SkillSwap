import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importando o componente de ícones FontAwesome do Expo vector icons
import { Tabs } from 'expo-router'; // Importando o componente Tabs do Expo Router
import React from 'react'; // Importando o React

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="homePage2" // Definindo o nome da primeira aba como "index"
        options={{
          title: "Home", // Definindo o título da aba como "Home"
          headerShown: false, // Escondendo o cabeçalho
          headerTitleStyle: { color: "white" }, // Estilizando a cor do título do cabeçalho
          tabBarLabelStyle: {
            color: 'white', // Estilizando a cor do rótulo da aba
            fontSize: 12, // Definindo o tamanho da fonte do rótulo da aba
          },
          tabBarStyle: {
            backgroundColor: "#212121", // Definindo a cor de fundo da barra de abas
            borderTopWidth: 0, // Removendo a borda superior
            borderTopColor: 'transparent', // Tornando a cor da borda superior transparente
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color="white" />, // Definindo o ícone da aba como "home" com a cor especificada
        }}
      />
      <Tabs.Screen
        name="createVacancy" // Definindo o nome da segunda aba como "searchPage"
        options={{
          title: "Criar vaga", // Definindo o título da aba como "Pesquisa"
          headerShown: false, // Escondendo o cabeçalho
          headerTitleStyle: { color: "#14b8a6" }, // Estilizando a cor do título do cabeçalho
          tabBarLabelStyle: {
            color: 'white', // Estilizando a cor do rótulo da aba
            fontSize: 12, // Definindo o tamanho da fonte do rótulo da aba
          },
          tabBarStyle: {
            backgroundColor: "#212121", // Definindo a cor de fundo da barra de abas
            borderTopWidth: 0, // Removendo a borda superior
            borderTopColor: 'transparent', // Tornando a cor da borda superior transparente
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color="white" />, // Definindo o ícone da aba como "search" com a cor especificada
        }}
      />
      <Tabs.Screen
        name="myVacancies" // Definindo o nome da terceira aba como "notifications"
        options={{
          title: "Minhas Vagas", // Definindo o título da aba como "Notificação"
          headerShown: false, // Escondendo o cabeçalho
          headerTitleStyle: { color: "#14b8a6" }, // Estilizando a cor do título do cabeçalho
          tabBarLabelStyle: {
            color: 'white', // Estilizando a cor do rótulo da aba
            fontSize: 12, // Definindo o tamanho da fonte do rótulo da aba
          },
          tabBarStyle: {
            backgroundColor: "#212121", // Definindo a cor de fundo da barra de abas
            borderTopWidth: 0, // Removendo a borda superior
            borderTopColor: 'transparent', // Tornando a cor da borda superior transparente
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color="white"  />, // Definindo o ícone da aba como "bell" com a cor especificada
        }}
      />
      <Tabs.Screen
        name="profile" // Definindo o nome da quarta aba como "profile"
        options={{
          title: "Perfil", // Definindo o título da aba como "Perfil"
          headerShown: false, // Escondendo o cabeçalho
          headerTitleStyle: { color: "#14b8a6" }, // Estilizando a cor do título do cabeçalho
          tabBarLabelStyle: {
            color: 'white', // Estilizando a cor do rótulo da aba
            fontSize: 12, // Definindo o tamanho da fonte do rótulo da aba
          },
          tabBarStyle: {
            backgroundColor: "#212121", // Definindo a cor de fundo da barra de abas
            borderTopWidth: 0, // Removendo a borda superior
            borderTopColor: 'transparent', // Tornando a cor da borda superior transparente
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle" color="white" />, // Definindo o ícone da aba como "user-circle" com a cor especificada
        }}
      />
    </Tabs>
  );
}
