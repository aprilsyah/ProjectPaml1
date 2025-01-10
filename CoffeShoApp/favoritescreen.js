// screens/FavoritScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FavoritScreen = () => {
  const [favoriteCoffees, setFavoriteCoffees] = useState([
    { id: '1', name: 'Espresso', image: require('../assets/espresso.jpg') },
    // Daftar favorit lainnya
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorit Kopi</Text>
      <FlatList
        data={favoriteCoffees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.coffeeName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 16, alignItems: 'center' },
  image: { width: 150, height: 150, borderRadius: 10 },
  coffeeName: { marginTop: 8, fontSize: 18, fontWeight: '500' },
});

export default FavoritScreen;
