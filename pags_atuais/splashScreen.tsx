import React from 'react';
import { Text, SafeAreaView, StyleSheet, Image } from 'react-native';


export function Splash() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.paragraph}>
        Skill Swap
      </Text>
    
      <Image style={styles.imagem} source = {require('../assets/iconOK.png')}>

      </Image>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 8,

  },

  imagem: {
    width: 250,
    height: 250,
    bottom: 90,
  },


  paragraph: {
    margin: 25,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f0f8ff',
    position: 'relative',
    top: 300,
    textShadowColor: 'rgba(151, 32, 255, 9.0)', 
    textShadowOffset: { width: 0, height: 0 }, 
    textShadowRadius: 40,
  },
});
