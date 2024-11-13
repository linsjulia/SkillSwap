import { Feather } from "@expo/vector-icons";
import { TextInput, View, Text } from "react-native";
import { useForm, Controller } from 'react-hook-form';

export interface RequisitosCampoDeTexto{
  placaholder:string
  onBlur?: () => void; 
  onChangeText?: (text: string) => void;
  value?: string;
  style?: object;
}

export function InputsText({placaholder, style, ... rest}: RequisitosCampoDeTexto){


  return (
    <View>
            <TextInput
            placeholderTextColor="white"
            placeholder={placaholder}
            {... rest}
            className="border bg-indigo-950 border-indigo-600 text-white color w-96 rounded-2xl h-14 text-left px-6 my-4"
            style={[{ 
              
              borderColor: "#6f00ff",
              fontWeight: "700",
              letterSpacing: 1.3,
              shadowColor: "cyan",
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 3,},  style]} 
         
          ></TextInput>
        
    </View>
  );
}

export function InputsPassword({placaholder, style, ... rest}: RequisitosCampoDeTexto){


  return (
    <View>
       
          <TextInput
          {... rest}
          secureTextEntry
          placeholderTextColor="white"
          placeholder={placaholder}
          className="border bg-indigo-950 border-indigo-600 text-white color w-96 rounded-2xl h-14 text-left px-6 my-4"
          style={[{
            borderColor: "#6f00ff",
            fontWeight: "700",
            letterSpacing: 1.3,
            shadowColor: "cyan",
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 3,}, style]}
          ></TextInput>
  
    </View>
  )
}
