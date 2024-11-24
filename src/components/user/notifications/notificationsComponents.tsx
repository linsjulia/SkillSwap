import React from "react";
import { Text, View } from "react-native";

export function TitleNotifications() {
  return (
   <View className="flex-row items-center gap-16">

    <Text
      className="text-2xl mt-5 ml-4 text-white"
      style={{
    
        fontWeight: "700",
        letterSpacing: 1.5,
        textShadowColor: '#0000ff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20, // Ajuste para mais ou menos brilho
      }}
      >
      Notificações
    </Text>
    <Text
      className="text-zinc-200 text-sm mt-6 ml-2 "
      style={{
     
        fontWeight: "700",
        letterSpacing: 1,
      }}
      >
      Marcar todas como lida
    </Text>
      </View>
  );

}

interface notificationsProps{
  nameEnterprise:string,
  content:string,
  date:string
}


export function CardNotification({nameEnterprise,content,date}: notificationsProps){
  return(
    <View className="items-center">
    <View className=" w-96 items-left border border-indigo-600 my-4 rounded-xl py-3 justify-center">
    <View className="flex-row items-center gap-1 ml-3 ">
      <Text className="text-indigo-500 "   style={{

        fontWeight: "700",
        letterSpacing: 1,
      }}>
        {nameEnterprise}
      </Text>
      <Text className="text-white "style={{
   
        fontWeight: "500",
        letterSpacing: 1,
      }}>
        {content}
      </Text>
    </View>
    <Text className="text-white text-left mt-2 ml-3"style={{
 
      fontWeight: "500",
      letterSpacing: 1,
    }}>{date}</Text>
        </View>
    </View>
    
  )
}