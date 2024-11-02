import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@/src/components/Slider";


export default function Home() {
  return(
    <View style={styles.neonBorder}>
      <Text></Text>
      
      <Slider/>
    </View>
  )
}

const styles = StyleSheet.create({
    neonBorder: {

      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: "#1e1e1e",
     
    }
  
  /*container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,  
  }*/
})