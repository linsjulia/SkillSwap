import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, Pressable } from 'react-native';

export default function Box() {
  return (
   
      <View style={styles.boxMain}>

      <View style={{
        width: 260,
        height: 55,
        top: 45,
        backgroundColor: '#696969',     
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        }}>
      </View>

      </View>
   
  );
}

const styles = StyleSheet.create({

    boxMain: {
      backgroundColor: 'transparent',
      
     
      width: 320,
      height: 500,
      position: 'absolute',
      top: 190,
      justifyContent: 'center',
      alignItems: 'center',
    },

  /*  box: {
      backgroundColor: '#696969',
      borderRadius: 25,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    }, */

 
});
