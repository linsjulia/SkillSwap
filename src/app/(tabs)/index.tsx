import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@/src/components/Slider";
import { getAuth, signOut } from "firebase/auth";
import { router } from "expo-router";


export default function Home() {


  return(
    <View style={styles.neonBorder}>
      <Text className="color-white top-20 font-bold" style={{ fontSize: 20,}}>Feed de vagas</Text>
      <Slider/>
    </View>
  )
}

const styles = StyleSheet.create({
    neonBorder: {

      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: "#111",
     
    }
  
  /*container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,  
  }*/
})