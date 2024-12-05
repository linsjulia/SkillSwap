
import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

const ProfileImage = ({ userData }) => {
  const profileImageUrl = userData?.profileImageUrl;

  return (
    <View style={styles.container}>
        <Image source={profileImageUrl ? {uri: profileImageUrl} : require('../assets/user.png') } style={styles.profileImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#00ffd5',
    top: 10,
    left: 15,
  },
  profileImageNotFound: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#00ffd5',
    top: 0,
  },
  placeholderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileImage;
