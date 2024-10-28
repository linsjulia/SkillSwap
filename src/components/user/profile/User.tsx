import { View, Text } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

interface NameText {
  title: string, // Definindo o tipo para a propriedade title
}


export function UserLogo({title}:NameText){
  return(
<View className="items-center">
  <Avatar className="w-32 h-32 border-4 border-gray-600">
  <AvatarImage source={require("../../../assets/github.png")}/>
    <AvatarFallback>User</AvatarFallback>
  </Avatar>
  <Text className="text-white font-bold text-2xl mt-4">Usuário</Text>
  <Text className="text-gray-400 text-lg">@usuario</Text>
</View>



  )
}