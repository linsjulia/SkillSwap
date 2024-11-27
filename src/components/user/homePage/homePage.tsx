import { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

function filterDesc(nameEnterprise2: string | undefined) {
  if (!nameEnterprise2) {
    return "Título indisponível";
  }

  if (nameEnterprise2.length < 14) {
    return nameEnterprise2;
  }

  return `${nameEnterprise2.substring(0, 14)}...`;
}

function filterDescription(description2: string | undefined) {
  if (!description2) {
    return "Descrição indisponível";
  }

  if (description2.length < 148) {
    return description2;
  }

  return `${description2.substring(0, 148)}...`;
}

interface Work {
  title2: string;
  nameEnterprise2: string;
  description2: string;
  image2: string;
  userName: string; 
  userEmail: string; 
  userProfileImage: string;
}

export function CardWork({
  title2,
  nameEnterprise2,
  description2,
  userName,
  userEmail,
  userProfileImage,
}: Work) {
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

  const handleNavigation = (route: string) => {
    alert(`Navegando para: ${route}`);
  };

  return (
    <View style={styles.container}>
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

        <Pressable style={styles.menuItemContainer} onPress={() => handleNavigation('Perfil')}>
          <FontAwesome name="user" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Perfil</Text>
        </Pressable>

        <Pressable style={styles.menuItemContainer} onPress={() => handleNavigation('Configurações')}>
          <FontAwesome name="cogs" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Configurações</Text>
        </Pressable>

        <Pressable style={styles.menuItemContainer} onPress={() => handleNavigation('Suporte')}>
          <FontAwesome name="question-circle" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Suporte</Text>
        </Pressable>

        <Pressable style={styles.menuItemContainer} onPress={() => handleNavigation('Deslogar')}>
          <FontAwesome name="sign-out" size={24} color="#6f00ff" />
          <Text style={styles.menuItem}>Deslogar</Text>
        </Pressable>
      </Animated.View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title2}</Text>

        <View style={styles.cardImageContainer}>
          <Image
            source={require('../../../assets/tata.png')}
            resizeMode="center"
            style={styles.cardImage}
          />
          <Text style={styles.enterpriseName}>
            {filterDesc(nameEnterprise2)}
          </Text>
        </View>

        <Text style={styles.description}>
          {filterDescription(description2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingLeft: 0,
    backgroundColor: '#111',
  },
  menuButton: {
    position: 'absolute',
    top: -205,
    left: -15,
    zIndex: 1,
  },
  menu: {
    position: 'absolute',
    top: -180,
    left: -50,
    width: 180,
    height: 550,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    zIndex: 2,
    borderColor: '#6f00ff',
    
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10, 
  },
  menuItem: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#333',
  },
  card: {
    shadowColor: "white",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    backgroundColor: "#6f00ff",
    width: 270,
    height: 330,
    bottom: 58,
    left: 0,
    borderRadius: 15,
    padding: 20,
    top: -40,
  },
  cardTitle: {
    fontWeight: '700',
    letterSpacing: 1,
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    top: 10,
  },
  cardImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
  },

  enterpriseName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 28,
    marginLeft: 10,
    top: 40,
  },

  description: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.5,
    marginLeft: 20,
    marginRight: 20,
    top: -20,
  },
});
