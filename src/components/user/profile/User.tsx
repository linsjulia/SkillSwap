import { View, Text } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export function User(){
  return(
<View className="items-center">
  <Avatar className="w-32 h-32 border-4 border-gray-600">
    <AvatarImage  source={{uri:"https://instagram.fcgh3-1.fna.fbcdn.net/v/t51.2885-19/447023497_274842545711153_1403164484003397817_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fcgh3-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=itthutYaUcwQ7kNvgF9y_7m&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYCgnH_5Y1E9jyHjYXKkIL_GjcJAjIHB0c6BJYlWX_yyjg&oe=66AA411B&_nc_sid=bef7bc"}}/>
    <AvatarFallback>Diamon</AvatarFallback>
  </Avatar>
  <Text className="text-white font-bold text-2xl mt-4">Joao Vitor Diamon</Text>
  <Text className="text-gray-400 text-lg">@diamonxd</Text>
</View>



  )
}