import { View, Text } from "react-native";
import { CardWork } from "../../components/homePage/homePage";

export default function Index() {
  return (
    <View className="flex items-center bg-neutral-900 h-full">
      <Text
        className=" py-9 text-4xl  relative  text-violet-50"
        style={{ fontFamily: "Inter", fontWeight: "bold" }}
      >
        Feed de Vagas
      </Text>
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
  );
}
