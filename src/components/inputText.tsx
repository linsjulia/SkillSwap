import { Feather } from "@expo/vector-icons";
import { TextInput, View, Text } from "react-native";
import { useForm, Controller } from 'react-hook-form';

export interface RequisitosCampoDeTexto{
  placaholder:string
}

export function InputsText({placaholder}: RequisitosCampoDeTexto){
  const { control, handleSubmit, formState: {errors} } = useForm({
    defaultValues:{
      firstName: '',
      lastName: ''
    }
  });

  return (
    <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: {onChange, onBlur, value}}) => (
            <TextInput
            placeholderTextColor="white"
            placeholder={placaholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          
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
     )}
     name="firstName" 
   />
    {errors.firstName && <Text>Isso é obrigatório</Text>}
        
        <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: {onChange, onBlur, value}}) => (
          
        
        
        )}
        
        />
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