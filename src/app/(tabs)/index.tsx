import { Animated, Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import Slider from "@/src/components/Slider";
import { getAuth, signOut } from "firebase/auth";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { signOutUser } from "@/src/services/signOut";


interface Work {
  title2: string;
  nameEnterprise2: string;
  description2: string;
  image2: string;
  userName: string; 
  userEmail: string; 
  userProfileImage: string;
}

export default function Home({userName, userEmail, userProfileImage }: Work) {

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuSlide = useState(new Animated.Value(-250))[0]; 
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    Animated.timing(menuSlide, {
      toValue: isMenuVisible ? -250 : 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  return(
    <View style={styles.neonBorder}>
      <Text className="color-white top-20 font-bold" style={{ fontSize: 20,}}>Feed de vagas</Text>

      <Pressable onPress={toggleMenu} style={styles.menuButton}>
      <FontAwesome name="bars" size={24} color="white" />
      </Pressable>

      <Animated.View
        style={[styles.menu, { transform: [{ translateX: menuSlide }] }]}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userProfileImage }} 
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        </View>

        <Pressable style={styles.menuItemContainer} onPress={() => router.replace('/(tabs)/profile')}>
          <FontAwesome name="user" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Perfil</Text>
        </Pressable>

        <Pressable style={styles.menuItemContainer} onPress={() => router.replace('/(stack)/settings')}>
          <FontAwesome name="cogs" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Configurações</Text>
        </Pressable>

        <Pressable style={styles.menuItemContainer} onPress={() => router.replace('/(stack)/suport')}>
          <FontAwesome name="question-circle" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Suporte</Text>
        </Pressable>

        <Pressable style={styles.menuItemContainer} onPress={signOutUser}>
          <FontAwesome name="sign-out" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Deslogar</Text>
        </Pressable>
      </Animated.View>


      <Slider/>
     
    </View>
  )
}

const styles = StyleSheet.create({
    neonBorder: {
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: "#111",
     
    },
  
  /*container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,  
  }*/

    menuButton: {
      position: 'absolute',
      top: 35,
      left: 30,
      zIndex: 1,
    },
    menu: {
      position: 'absolute',
      top: 90,
      left: 0,
      width: 200,
      height: 500,
      backgroundColor: '#1d103f',
      padding: 20,
      borderRadius: 10,
      zIndex: 2,
      borderColor: '#6f00ff',
      borderWidth: 1,
      
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },

    menuItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      marginBottom: 10, 
    },
    menuItem: {
      fontSize: 18,
      paddingLeft: 10,
      color: '#ffffff',
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    userName: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    userEmail: {
      color: '#ccc',
      fontSize: 14,
    },
})