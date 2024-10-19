import { SearchInput } from "@/src/components/user/searchPage/searchPageComponents";
import { Text, View } from "react-native";

export default function SearchPage(){
  return(
    <View className="bg-zinc-900 h-full items-center">
    <SearchInput/>
    </View>
  )
}