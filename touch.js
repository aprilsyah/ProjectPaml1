import React, { useState, useEffect } from 'react';

import {View, Text, StatusBar, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet} from 'react-native'

const App = () => {

  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  return ( 

<ScrollView>

<View style={{flex: 1, justifyContent: 'center'}}>
    <StatusBar backgroundColor={'pink'} barStyle={'dark-content'} />

    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={{uri: 'https://i.pinimg.com/originals/9c/14/de/9c14de75fd8595feb16f5c2b30809245.jpg'}}
      style={styles.foto}/>
      </View>

    <Text>{email}</Text>

    <Text style={styles.textLogin}>
      Login
    </Text>
    <Text style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black'}}> 
    Silahkan Masukkan Email dan Password
    </Text>

    <TextInput 
    value={email}
    style={{
      backgroundColor: 'white', 
    elevation: 5, 
    marginHorizontal: 20, 
    marginTop: 20,
    borderRadius: 9,
    paddingLeft: 10,
    }}
    placeholder='Masukkan Email'

    onChangeText={(text) => setEmail(text)}
    /> 

<TextInput 
    value={password}
    style={{
      backgroundColor: 'white', 
    elevation: 5, 
    marginHorizontal: 20, 
    marginTop: 10,
    borderRadius: 9,
    paddingLeft: 10,
    }}
    placeholder='Masukkan Password'

    onChangeText={(text) => setPassword(text)}
    secureTextEntry
      
    /> 

    <TouchableOpacity style={styles.buttonLogin}>
      <Text style={{color: 'white'}}> Login </Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.buttonRegister}>
      <Text style={{color: 'white'}}> Register </Text>
    </TouchableOpacity>
  </View>

</ScrollView>

 
    
  );
};

const styles = StyleSheet.create({
  foto: {
    width: 200, 
      height: 200, 
      marginTop: 10, 
      marginBottom: 10, 
      marginLeft: 10, 
      marginRight: 10,
      borderRadius: 250 / 2,
      borderWidth: 10,
      borderColor: 'black',

  },
  textLogin: {
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: 'black',

  },
buttonLogin: {
  backgroundColor: 'red', 
      marginVertical: 10,
      paddingVertical: 12,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 9,
      elevation: 3,
      marginBottom: 1,

},
buttonRegister: {
  backgroundColor: 'black', 
      marginVertical: 10,
      paddingVertical: 12,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 9,
      elevation: 3,
      marginBottom: 1,

},
})

export default App;