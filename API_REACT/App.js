//import * as React from 'react'; import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import axios from 'axios';


function HomeScreen({ navigation }) {
return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Text>Home Screen</Text>
<Button
title="Go to Details"
onPress={() => navigation.navigate('Details')} />
</View>
 );
}


function DetailsScreen({ navigation }) 
//INICIO APP API
{
  const [dados, setDados] = useState({});
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Função para carregar os dados ao iniciar o aplicativo
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dados');
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };

  const atualizarDados = async () => {
    try {
      await axios.post('http://localhost:3000/atualizar', {
        nome,
        idade,
        email
      });
      // Recarregar os dados após a atualização
      carregarDados();
      Alert.alert('Dados atualizados com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
      Alert.alert('Erro ao atualizar os dados');
    }
  };


  return (
    <View style={styles.container}>
      <Text>Nome: {dados.nome}</Text>
      <Text>Idade: {dados.idade}</Text>
      <Text>Email: {dados.email}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Novo Nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Nova Idade"
          value={idade}
          onChangeText={text => setIdade(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Novo Email"
          value={email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <Button
          title="Atualizar Dados"
          onPress={atualizarDados}
        />
      </View>
    </View>
  );
}

//FIM APP API
//INICIO Estilo da minha API

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

//FIM Estilo da minha API



const Stack = createNativeStackNavigator();
function App() {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen} />
<Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>
</NavigationContainer>
);
}
export default App;
