import { View, Text, StyleSheet } from "react-native";
import { BotaoVagas, CardWork } from "../../components/user/homePage/homePage";

export default function Index() {
  return (
    <View style={styles.neonBorder} >
      
      <Text
        className=" py-9 text-3xl  relative  text-violet-50"
        style={{ fontFamily: "", fontWeight: "bold" }}
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

}
)