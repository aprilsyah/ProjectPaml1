// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>
      <Text style={styles.info}>Nama: John Doe</Text>
      <Text style={styles.info}>Email: johndoe@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  info: { fontSize: 18, marginTop: 8 },
});

export default ProfileScreen;
