import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TouchableOpacity,
  View, Keyboard, ScrollView, Image
} from 'react-native';
import styles from './styles';
import { TextInput, Paragraph, Dialog, Portal, Appbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons';


export default function App() {

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content style={styles.title} title="Cadastro Usuário" />

      </Appbar.Header>
      {/* <View style={styles.campo}>
        <TextInput
          keyboardType='numeric'
          label="Código"
          value={codigo}
          mode="outlined"
          placeholder="Digite o Código"
          onChangeText={text => setCodigo(text)}
        />
      </View> */}

    </ScrollView>



  );
}


