// screens/CoffeeDetailScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CoffeeDetailScreen = () => {
  const { params } = useRoute();
  const { coffee } = params;
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <View style={styles.container}>
      <Image source={coffee.image} style={styles.image} />
      <Text style={styles.name}>{coffee.name}</Text>
      <Text style={styles.description}>Deskripsi kopi yang lebih detail akan ditampilkan di sini.</Text>
      <TouchableOpacity
        style={[styles.favoriteButton, isFavorited && styles.favorited]}
        onPress={toggleFavorite}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorited ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#fff' },
  image: { width: 250, height: 250, borderRadius: 10 },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 16 },
  description: { fontSize: 16, marginTop: 8, textAlign: 'center' },
  favoriteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0ad4e',
    borderRadius: 5,
  },
  favorited: {
    backgroundColor: '#d9534f',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CoffeeDetailScreen;
