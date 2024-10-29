import { View, Text, StyleSheet, Animated } from "react-native";
import { BotaoVagas, CardWork } from "../../components/user/homePage/homePage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";


export default function Home() {
 
  const { mensagem } = useLocalSearchParams(); // isso aqui é parametro da outra pagina passando pra cá
  const fadeAnim = useRef(new Animated.Value(1)).current; 


  // pra deixar a mensagem com animação de fade-out 
  useEffect(() => {
    if (mensagem) {
     
      Animated.timing(fadeAnim, {
        toValue: 0, 
        duration: 5000, 
        useNativeDriver: true, 
      }).start();
    }
  }, [mensagem]);

  return (
    <View style={styles.neonBorder} >
      
      {mensagem && (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>{mensagem}</Text>
        </Animated.View>
      )}

      <Text
        className=" py-9 text-3xl  relative  text-violet-50"
        style={{ fontWeight: "bold" }}
      >
        Feed de Vagas
      </Text>
      <View style={styles.container}>
        <View className="">
      <CardWork
        title="Desenvolvedor FullStack"
        nameEnterprise="Tata Solucoes"
        description="Estamos em busca de desenvolvedores de software habilidosos para se unirem à nossa equipe dinâmica...."
      />
      <CardWork
        title="Desenvolvedor FullStack"
        nameEnterprise="Net Solutin"
        description="Estamos em busca de engenheiros de dados habilidosos para se unirem à nossa equipe dinâmica........"
      />
      
      </View>
      <BotaoVagas/>  
      </View>
      
      </View>
    
  );
}

const styles = StyleSheet.create({
  neonBorder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 10,
  
  },

  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },

  messageContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },

  overlay: {
    position: "absolute",
    top: 20, 
    left: 0,
    right: 0,
    backgroundColor: "#6a00ff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: "center",
    zIndex: 10, 
  },
  
  messageText: {
    color: 'white',
  },

}
)