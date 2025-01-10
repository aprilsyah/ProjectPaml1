// navigation/StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import FavoritScreen from '../screens/FavoritScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CoffeeDetailScreen from '../screens/CoffeeDetailScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Favorit" component={FavoritScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CoffeeDetail" component={CoffeeDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
