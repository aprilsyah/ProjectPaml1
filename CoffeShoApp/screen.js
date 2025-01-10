// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const coffeeMenu = [
  { id: '1', name: 'Espresso', image: require('../assets/espresso.jpg') },
  { id: '2', name: 'Latte', image: require('../assets/latte.jpg') },
  { id: '3', name: 'Cappuccino', image: require('../assets/cappuccino.jpg') },
  // Tambahkan item kopi lainnya
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToDetail = (coffee) => {
    navigation.navigate('CoffeeDetail', { coffee });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Kopi</Text>
      <FlatList
        data={coffeeMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => goToDetail(item)}>
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

export default HomeScreen;
