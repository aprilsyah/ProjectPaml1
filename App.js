import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Alert, Modal } from 'react-native';

const App = () => {
  const [favoriteCoffees, setFavoriteCoffees] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [newCoffeeName, setNewCoffeeName] = useState('');
  const [newCoffeeDescription, setNewCoffeeDescription] = useState('');
  const [coffeeMenu, setCoffeeMenu] = useState([
    { id: 1, name: 'Espresso', image: 'https://th.bing.com/th/id/OIP.dByRjIi_hqH-mFGU4-mkPwHaE8?rs=1&pid=ImgDetMain', description: 'A strong coffee brewed by forcing steam through finely ground coffee beans.', price: 35000 },
    { id: 2, name: 'Latte', image: 'https://brookrest.com/wp-content/uploads/2020/05/AdobeStock_315919556-scaled.jpeg', description: 'A coffee drink made with espresso and steamed milk.', price: 40000 },
    { id: 3, name: 'Cappuccino', image: 'https://th.bing.com/th/id/OIP.kbjQCtA_at72z3EldA1UmQHaFJ?rs=1&pid=ImgDetMain', description: 'An espresso-based coffee drink topped with steamed milk and foam.', price: 40000 },
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [registration, setRegistration] = useState({ username: '', password: '' });
  const [isLogin, setIsLogin] = useState(false); // To track if user is logged in
  const [activeScreen, setActiveScreen] = useState('login'); // Start at login screen
  const [orderedCoffees, setOrderedCoffees] = useState([]); // To store ordered coffees
  const [showImageModal, setShowImageModal] = useState(false); // For image explanation modal

  // Fungsi untuk menambahkan kopi ke favorit
  const addToFavorites = (coffee) => {
    if (favoriteCoffees.find(item => item.id === coffee.id)) {
      Alert.alert('Info', 'This coffee is already in your favorites!');
    } else {
      setFavoriteCoffees([...favoriteCoffees, coffee]);
      Alert.alert('Success', `${coffee.name} added to favorites!`);
    }
  };

  // Fungsi untuk menambahkan kopi ke keranjang
  const addToCart = (coffee, quantity) => {
    const newCartItem = { ...coffee, quantity };
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === coffee.id);
      if (existingItem) {
        existingItem.quantity += quantity;
        return [...prevItems];
      }
      return [...prevItems, newCartItem];
    });
    setOrderedCoffees(prev => [...prev, coffee]); // Add to ordered coffees when ordered
    Alert.alert('Added to Cart', `${coffee.name} has been added to your cart with ${quantity} quantity!`);
  };

  // Fungsi untuk melihat detail kopi
  const viewCoffeeDetails = (coffee) => {
    setSelectedCoffee(coffee);
    setShowImageModal(true); // Open modal to show image explanation
  };

  // Fungsi untuk kembali ke daftar menu
  const backToMenu = () => {
    setSelectedCoffee(null);
    setShowImageModal(false); // Close the modal
    setActiveScreen('home');
  };

  // Fungsi untuk pergi ke keranjang
  const goToCart = () => {
    if (cartItems.length > 0) {
      const cartDetails = cartItems.map((item, index) => (
        <Text key={index}>
          {item.name} - {item.quantity} x Rp. {item.price.toLocaleString()} = Rp. {(item.price * item.quantity).toLocaleString()}
        </Text>
      ));
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      Alert.alert('Your Cart', `Items in Cart: \n${cartDetails.join('\n')}\n\nTotal: Rp. ${totalPrice.toLocaleString()}`);
    } else {
      Alert.alert('Cart', 'Your cart is empty.');
    }
  };

  // Fungsi untuk mendaftar akun
  const handleRegister = () => {
    if (registration.username && registration.password) {
      setUser(registration);
      Alert.alert('Registration Success', `Welcome ${registration.username}!`);
      setIsLogin(true);
      setActiveScreen('profile');
    } else {
      Alert.alert('Error', 'Please fill in all fields to register');
    }
  };

  // Fungsi untuk login
  const handleLogin = () => {
    if (user) {
      setIsLogin(true);
      setActiveScreen('home');
      Alert.alert('Login Success', `Welcome back, ${user.username}!`);
    } else {
      Alert.alert('Error', 'No account found, please register first');
    }
  };

  // Fungsi untuk menambahkan kopi baru
  const addNewCoffee = () => {
    if (newCoffeeName && newCoffeeDescription) {
      const newCoffee = {
        id: coffeeMenu.length + 1, // Generate a new ID
        name: newCoffeeName,
        description: newCoffeeDescription,
        price: 50000, // You can set a default price for new coffee, or ask the user for it
        image: 'https://via.placeholder.com/150', // You can use a placeholder or allow the user to upload an image
      };
      setCoffeeMenu([...coffeeMenu, newCoffee]);
      setNewCoffeeName('');
      setNewCoffeeDescription('');
      Alert.alert('Success', `${newCoffeeName} added to the menu!`);
    } else {
      Alert.alert('Error', 'Please provide both a name and description for the new coffee.');
    }
  };

  // Fungsi untuk menambah dan mengurangi jumlah kopi
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Fungsi untuk log out
  const handleLogout = () => {
    setUser(null);
    setIsLogin(false);
    setActiveScreen('login');
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Navigation Bar */}
      {activeScreen !== 'login' && (
        <View style={styles.navBar}>
          <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('home')}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('favorites')}>
            <Text style={styles.navText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => setActiveScreen('profile')}>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Login/Registration Screens */}
      {activeScreen === 'login' && (
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={registration.username}
            onChangeText={(text) => setRegistration({ ...registration, username: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={registration.password}
            onChangeText={(text) => setRegistration({ ...registration, password: text })}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Home Screen */}
      {activeScreen === 'home' && (
        <View style={styles.homeContainer}>
          <Text style={styles.header}>Coffee Shop Indonesia</Text>
          <Text style={styles.subHeader}>Choose Your Favorite Coffee</Text>
          {coffeeMenu.map((coffee) => (
            <View key={coffee.id} style={styles.menuItem}>
              <TouchableOpacity onPress={() => viewCoffeeDetails(coffee)} style={styles.menuButton}>
                <Image source={{ uri: coffee.image }} style={styles.menuImage} />
                <Text style={styles.menuItemText}>{coffee.name}</Text>
                <Text style={styles.menuItemText}>Rp. {coffee.price.toLocaleString()}</Text>
                <Text style={styles.menuItemText}>Details</Text>
              </TouchableOpacity>

              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.controlButton}>
                  <Text style={styles.controlButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(coffee, quantity)}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => addToFavorites(coffee)}
              >
                <Text style={styles.buttonText}>Add to Favorites</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.cartButton} onPress={goToCart}>
            <Text style={styles.buttonText}>Go to Cart</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Favorites Screen */}
      {activeScreen === 'favorites' && (
        <View style={styles.favoritesContainer}>
          <Text style={styles.header}>Your Favorite Coffees</Text>
          {favoriteCoffees.length > 0 ? (
            favoriteCoffees.map((coffee) => (
              <View key={coffee.id} style={styles.favoriteItem}>
                <Image source={{ uri: coffee.image }} style={styles.menuImage} />
                <Text style={styles.menuItemText}>{coffee.name}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noFavoritesText}>You don't have any favorite coffees yet.</Text>
          )}
        </View>
      )}

      {/* Profile Screen */}
      {activeScreen === 'profile' && (
        <View style={styles.profileContainer}>
          <Text style={styles.header}>Your Profile</Text>
          <Image source={{ uri: 'https://th.bing.com/th/id/OIP.eB7HjzoPIP-nH6rT2hK-VQHaJQ?rs=1&pid=ImgDetMain' }} style={styles.profileImage} />
          {user ? (
            <>
              <Text style={styles.profileText}>Welcome, {user.username}</Text>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.profileText}>Please log in to see your profile</Text>
          )}
        </View>
      )}

      {/* Image Modal */}
      {showImageModal && selectedCoffee && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showImageModal}
          onRequestClose={() => setShowImageModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>{selectedCoffee.name}</Text>
              <Image source={{ uri: selectedCoffee.image }} style={styles.menuImage} />
              <Text style={styles.menuItemText}>{selectedCoffee.description}</Text>
              <TouchableOpacity onPress={() => setShowImageModal(false)} style={styles.closeModalButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#20B2AA',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#4CAF50',
  },
  navButton: {
    padding: 10,
  },
  navText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 20,
  },
  menuImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  controlButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
  },
  addToCartButton: {
    backgroundColor: '#20B2AA',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  favoriteButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  cartButton: {
    backgroundColor: '#20B2AA',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  favoritesContainer: {
    padding: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  noFavoritesText: {
    fontSize: 18,
    color: '#888',
  },
  profileContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeModalButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default App;
