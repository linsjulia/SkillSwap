import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";

export function SearchInput() {
  return (
    <View className="w-96 flex-row border border-white h-14 rounded-2xl items-center gap-2 px-4 bg-transparent mt-6">
      <Feather name="search" size={24} color={"white"} />
      <TextInput
        style={{ fontWeight: "700", letterSpacing: 1.1 }}
        placeholder="Busque aqui!"
        placeholderTextColor={"white"}
        className="w-full flex-1 h-full text-white"
        bg-transparent
      />
    </View>
  );
}
