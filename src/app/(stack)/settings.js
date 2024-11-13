import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useVerificarColecaoUser } from '../../services/verificarColecaoUser';
import { signOutUser } from '@/src/services/signOut';
import ProfileImage from '@/src/components/ProfileImage';

const SettingsScreen = () => {
  const router = useRouter();
  const { userType, userData } = useVerificarColecaoUser(); 

  
  const handleGoBack = () => {
    if (userType === 'Empresa') {
      router.replace('/empresa/(tabs)/profile');
    } else if (userType === 'Usuário') {
      router.replace('/(tabs)/profile');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity onPress={handleGoBack} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#bebebe"
      />

 
      <View style={styles.profileCard}>
        {userData ? (
          <>
  
            <ProfileImage userData={userData} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{userData.nome || 'Nome não disponível'}</Text>
              <Text style={styles.profileEmail}>{userData.email || 'Email não disponível'}</Text>
            </View>
          </>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#894aff" />
            <Text style={styles.loadingText}>Carregando perfil...</Text>
          </View>
        )}
      </View>

     
      <View style={styles.footer}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={signOutUser}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00AEEF',
    marginBottom: 90,
    top: 60,
  },
  backIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    
  },
  searchInput: {
    backgroundColor: '#2c2c2c', 
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  
  },
  profileCard: {
    backgroundColor: '#8c00ff', 
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  profileImage: {
    width: 30,
    height: 60,  
  },
  profileInfo: {
    justifyContent: 'center',
    left: 20,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#fff',
  },
  loadingContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
  
    
  },
  editProfileButton: {
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,

  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  logoutButton: {
    borderColor: '#FF3B3F',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  logoutText: {
    color: '#FF3B3F',
    fontSize: 16,
  },
});

export default SettingsScreen;
