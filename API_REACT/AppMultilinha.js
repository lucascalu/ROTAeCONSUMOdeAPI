import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/lucascalu/ROTAeCONSUMOdeAPI/main/NODE_API/data3.json');
      
      // Verifica se a resposta possui um array de dados
      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error('Os dados recebidos não estão no formato esperado:', response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Verifica se data é um array antes de fazer o mapeamento */}
      {Array.isArray(data) && data.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.text}>Nome: {item.nome}</Text>
          <Text style={styles.text}>Idade: {item.idade}</Text>
          <Text style={styles.text}>Email: {item.email}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default App;
