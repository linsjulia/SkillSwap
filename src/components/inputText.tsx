import { Feather } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export interface RequisitosCampoDeTexto{
  placaholder:string
}




export function InputsText({placaholder}: RequisitosCampoDeTexto){
  return (
    <View>

    <TextInput

          placeholderTextColor="white"
          placeholder={placaholder}
          
          className="border  border-indigo-600 text-white color w-96 rounded-full h-14 text-left px-6 my-4"
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            letterSpacing: 1.3,
            shadowColor: "cyan",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
          }}
          ></TextInput>
          </View>
  )
}

export function InputsPassword({placaholder}: RequisitosCampoDeTexto){
  return (
    <View>

    <TextInput
          secureTextEntry
          placeholderTextColor="white"
          placeholder={placaholder}
          className="border  border-indigo-600 text-white color w-96 rounded-full h-14 text-left px-6 my-4"
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            letterSpacing: 1.3,
            shadowColor: "cyan",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
          }}
          ></TextInput>
          </View>
  )
}