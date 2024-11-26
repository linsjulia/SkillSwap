import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { db, auth } from '../../../firebaseConfig'; 
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native'; 

export default function EditJobFormScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const vagaId = route.params?.vagaId;

  const [Localizacao, setLocalizacao] = useState('');
  const [Salario, setSalario] = useState('');
  const [Forma_Trabalho, setForma_Trabalho] = useState('');
  const [Beneficios, setBeneficios] = useState<string[]>([]);
  const [Exigencias, setExigencias] = useState<string[]>([]);
  const [Descricao, setDescricao] = useState('');
  const [Titulo, setTitulo] = useState('');

  useEffect(() => {
    if (!vagaId) {
      Alert.alert("Erro", "ID da vaga não encontrado.");
      return;
    }

    const carregarVaga = async () => {
      try {
        const vagaRef = doc(db, "Vagas", vagaId);
        const vagaDoc = await getDoc(vagaRef);
        
        if (vagaDoc.exists()) {
          const vaga = vagaDoc.data();
          setTitulo(vaga.Titulo);
          setLocalizacao(vaga.Localizacao);
          setSalario(vaga.Salario);
          setForma_Trabalho(vaga.Forma_Trabalho);
          setBeneficios(vaga.Beneficios);
          setExigencias(vaga.Exigencias);
          setDescricao(vaga.Descricao);
        } else {
          Alert.alert("Erro", "Vaga não encontrada.");
        }
      } catch (error) {
        Alert.alert("Erro", "Houve um problema ao carregar a vaga.");
        console.error(error);
      }
    };

    carregarVaga(); 
  }, [vagaId]);

  const handleSubmit = async () => {
    if (!Localizacao || !Salario || !Forma_Trabalho || Beneficios.length === 0 || Exigencias.length === 0 || !Descricao || !Titulo) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    try {
      const vagaRef = doc(db, "Vagas", vagaId);
      const updatedData = {
        Titulo,
        Descricao,
        Localizacao,
        Salario,
        Forma_Trabalho,
        Beneficios,
        Exigencias,
      };

      await updateDoc(vagaRef, updatedData);
      Alert.alert("Sucesso", "Vaga atualizada com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao atualizar a vaga.");
      console.error("Erro ao atualizar vaga: ", error);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir esta vaga?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              const vagaRef = doc(db, "Vagas", vagaId);
              await deleteDoc(vagaRef);
              Alert.alert("Sucesso", "Vaga excluída com sucesso!");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erro", "Houve um problema ao excluir a vaga.");
              console.error("Erro ao excluir vaga: ", error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Editar Vaga de Emprego</Text>
        <Text style={styles.subTitle}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Título da vaga"
          placeholderTextColor="#888"
          value={Titulo}
          onChangeText={setTitulo}
        />
        <Text style={styles.subTitle}>Localização</Text>
        <TextInput
          style={styles.input}
          placeholder="Localização da vaga"
          placeholderTextColor="#888"
          value={Localizacao}
          onChangeText={setLocalizacao}
        />
        <Text style={styles.subTitle}>Salário</Text>
        <TextInput
          style={styles.input}
          placeholder="Salário"
          placeholderTextColor="#888"
          value={Salario}
          onChangeText={setSalario}
        />
        <Text style={styles.subTitle}>Modelo de Trabalho</Text>
        <TextInput
          style={styles.input}
          placeholder="Modelo de trabalho"
          placeholderTextColor="#888"
          value={Forma_Trabalho}
          onChangeText={setForma_Trabalho}
        />

        <Text style={styles.subTitle}>Benefícios</Text>
        {Beneficios.map((beneficio, index) => (
          <Text key={index} style={styles.listItem}>- {beneficio}</Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Adicionar benefício"
          placeholderTextColor="#888"
          onSubmitEditing={(e) => setBeneficios([...Beneficios, e.nativeEvent.text])}
        />

        <Text style={styles.subTitle}>Exigências</Text>
        {Exigencias.map((exigencia, index) => (
          <Text key={index} style={styles.listItem}>- {exigencia}</Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Adicionar exigência"
          placeholderTextColor="#888"
          onSubmitEditing={(e) => setExigencias([...Exigencias, e.nativeEvent.text])}
        />

        <Text style={styles.subTitle}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição da vaga"
          placeholderTextColor="#888"
          value={Descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Atualizar Vaga</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir Vaga</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    top: 0,
    width: 330,
    paddingVertical: 20,
    borderRadius: 15,
    borderColor: '#6f00ff',
    borderWidth: 2,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  listItem: {
    color: '#FFF',
    marginBottom: 5,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#7700ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
