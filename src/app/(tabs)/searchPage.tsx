import { SearchInput } from "@/src/components/user/searchPage/searchPageComponents";
import { Text, View } from "react-native";

export default function SearchPage(){
  return(
    <View className="h-full items-center" style={{ backgroundColor: '#111'}}>
    <SearchInput/>
    </View>
  )
}