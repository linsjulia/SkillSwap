import { ReactNode } from "react";
import { View, Text , TextProps} from "react-native";
import {MaterialIcons} from "@expo/vector-icons"

interface OptionProps{
children:ReactNode
}
interface IconsProps{
  icon:keyof typeof MaterialIcons.glyphMap
  }



function Option({children}:OptionProps){
    return (<View className="w-full flex-row items-center gap-2 border-b border-gray-500 py-3">{children}</View>)
  }

function Icons({icon}: IconsProps){
  return <MaterialIcons name={icon} size={20} color={"white"} />
  }

  function Title(props: TextProps){
    return <Text className="text-white text-lg flex-1"{...props}></Text>
  }

  Option.Title = Title;
  Option.Icons = Icons;

  export {Option}