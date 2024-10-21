import { ExitButton, InfoProfile, ReadOnlyInput, SaveButton } from "@/src/components/user/profile/profileComponents";
import { User } from "@/src/components/user/profile/User";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";

export default function Profile() {
  return (

    <ScrollView className="flex-1  bg-zinc-900">
      <Image
        source={require("../../assets/banner.png")}
        className="w-full h-52 -mb-14"
        />
      <User />
      <InfoProfile name="Joao Vitor Diamon" email="joaodiamon19@icloud.com" bday="19/06/2006"/>
      <View className="items-center -mt-3 mb-3">
      <SaveButton onPress={() => {}}  text="Salvar alteracoes" />
      <ExitButton onPress={() => {
        router.replace('/_sitemap');
      }} text="Sair"></ExitButton>
        </View>
      </ScrollView>
  );
}
