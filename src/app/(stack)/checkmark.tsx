import React, { useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from "expo-router";

export default function ConfirmationScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/jobDescription'); // Altere para a rota desejada
    }, 2000); // 2000 ms = 2 segundos

    return () => clearTimeout(timer); // Limpeza do timer
  }, []);

  const handleImagePress = () => {
    router.push('/jobDescription'); // Navegar ao clicar na imagem
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image 
          source={require('../../assets/iconOK.png')} 
          style={styles.icon} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  icon: {
    width: 150,
    height: 150,
  },
});
