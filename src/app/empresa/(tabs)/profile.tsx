import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';


export default function UserProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <Image source={require('../../../assets/images.png')} style={styles.profileImage} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value="" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value="" />

        <Text style={styles.label}>Localização</Text>
        <TextInput style={styles.input} value="" />

        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Histórico de vagas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272727',
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    top: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  settingsButton: {
    top: 17,
  },
  settingsButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 80,
    borderWidth: 3,
    borderColor: '#000000',
  },
  form: {
    backgroundColor: '#7700ff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    bottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#333333',
  },
  optionButton: {
    paddingVertical: 10,
  },
  optionText: {
    color: '#3bffc4',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
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
