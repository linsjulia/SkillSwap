import { View, TextInput, Text, Pressable } from "react-native";
import { RequisitosCampoDeTexto } from "../../inputText";
import { TextButton } from "../../login/loginComponets";
import React from "react";

export function ReadOnlyInput({placaholder}: RequisitosCampoDeTexto){
  return (
    <View>

    <TextInput
          readOnly
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


interface ProfileProps{
  name:string,
  email:string,
  bday:string
}
export function InfoProfile ({name,email,bday}: ProfileProps){
  return (
    <View>
      <Text
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1,
        }}
        className="text-center text-white text-xl  mt-5"
      >
        Nome:
      </Text>
      <View className="flex-1 px-4 pb-4 items-center -mt-4">
        <ReadOnlyInput placaholder={name} />
      </View>
      <Text
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1,
        }}
        className="text-center text-white text-xl -mt-4 mb-3"
      >
        E-mail:
      </Text>
      <View className="flex-1 px-4 pb-4 items-center -mt-5">
        <ReadOnlyInput placaholder={email} />
      </View>
      <Text
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1,
        }}
        className="text-center text-white text-xl  -mt-4 mb-3"
      >
        Data de nascimento:
      </Text>
      <View className="flex-1 px-4 pb-4 items-center -mt-4">
        <ReadOnlyInput placaholder={bday} />
      </View>
    </View>
  )
}

export function SaveButton({ text, onPress }: TextButton) {
  return (
    <Pressable
    onPress={onPress} 
    className="text-gray-300 border bg-indigo-600 border-indigo-600 w-96 rounded-full h-14 mt-8 flex items-center justify-center">
      <Text
        className=" text-white text-2xl"
        style={{
          fontFamily: "Inter",
          fontWeight: "700",
          letterSpacing: 1.5,
          shadowColor: "cyan",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );

 
}

export function ExitButton({ text, onPress }: TextButton) {
  return (
    <Pressable
    onPress={onPress}
    className="text-gray-300 border bg-indigo-600 border-indigo-600 w-96 rounded-full h-14 mt-8 flex items-center justify-center"
    >
      <Text
      className=" text-white text-2xl"
      style={{
        fontFamily: "Inter",
        fontWeight: "700",
        letterSpacing: 1.5,
        shadowColor: "cyan",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
      }}
      >
        {text}
      </Text>
    </Pressable>
  )
}