import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assents/iconOk.png')}  
        style={styles.icon} 
      />
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
