import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function CompanyTabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ 
        headerShown: false,
        title: '',
        tabBarStyle: {
            backgroundColor: "#1e1e1e", // Definindo a cor de fundo da barra de abas
            borderTopWidth: 0, // Removendo a borda superior
            
            borderTopColor: 'transparent', // Tornando a cor da borda superior transparente
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color="white" />, // Definindo o ícone da aba como "home" com a cor especificada

       }} />

       
      <Tabs.Screen name="criarVagas" options={{ 
        headerShown: false,
        title: '',
        tabBarStyle: {
            backgroundColor: "#1e1e1e", // Definindo a cor de fundo da barra de abas
            borderTopWidth: 0, // Removendo a borda superior
            
            borderTopColor: 'transparent', // Tornando a cor da borda superior transparente
          },
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="pencil" color="white" />, // Definindo o ícone da aba como "home" com a cor especificada

       }} />
      <Tabs.Screen name="profile" options={{ 
        title: '', 
        headerShown: false,
        tabBarStyle :{
          backgroundColor: '#1e1e1e',
          borderTopWidth: 0,
          borderTopColor: 'transparent',
        },
        tabBarIcon: ({ color }) => <FontAwesome size={28} name='user' color='white'/>
        
        }} />

    </Tabs>
  );
}
