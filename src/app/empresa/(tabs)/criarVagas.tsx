import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { db, auth } from '../../../../firebaseConfig'; // Certifique-se de importar corretamente
import { collection, addDoc, doc } from 'firebase/firestore';

export default function JobFormScreen() {
  
  const [Localizacao, setLocalizacao] = useState('');
  const [Salario, setSalario] = useState('');
  const [Forma_Trabalho, setForma_Trabalho] = useState('');
  const [Beneficios, setBeneficios] = useState<string[]>([]); // Array de strings
  const [Exigencias, setExigencias] = useState<string[]>([]); // Array de strings
  
  const [Descricao, setDescricao] = useState('');
  const [Titulo, setTitulo] = useState('');
  const [novoBeneficio, setNovoBeneficio] = useState('');
  const [novaExigencia, setNovaExigencia] = useState('');

  // Função para adicionar um novo benefício
  const adicionarBeneficio = () => {
    if (novoBeneficio.trim()) {
      setBeneficios([...Beneficios, novoBeneficio]);
      setNovoBeneficio('');
    }
  };

  // Função para adicionar uma nova exigência
  const adicionarExigencia = () => {
    if (novaExigencia.trim()) {
      setExigencias([...Exigencias, novaExigencia]);
      setNovaExigencia('');
    }
  };

  // Função para submeter a vaga
  const handleSubmit = async () => {
    if ( !Localizacao || !Salario || !Forma_Trabalho || Beneficios.length === 0 || Exigencias.length === 0 || !Descricao || !Titulo) {
      Alert.alert("Erro", "Por favor, preencha todos os campos!");
      return;
    }

    try {
      const user = auth.currentUser; // Pega o usuário autenticado
      const empresaID = user?.uid; // ID da empresa logada

      const vaga = {
        Localizacao,
        Salario,
        Forma_Trabalho,
        Beneficios,
        Exigencias,
        Descricao,
        Titulo,
        empresa_ID: doc(db, "Empresa", empresaID as string),
        criadaEm: new Date(), // Timestamp
      };

      await addDoc(collection(db, "Vagas"), vaga); // Salva na coleção "Vagas"

      Alert.alert("Sucesso", "Vaga criada com sucesso!");
      // Limpar os campos após salvar
      setLocalizacao('');
      setSalario('');
      setForma_Trabalho('');
      setBeneficios([]);
      setExigencias([]);
      setDescricao('');
      setTitulo('');
    } catch (error) {
      Alert.alert("Erro", "Houve um problema ao criar a vaga. Tente novamente.");
      console.error("Erro ao criar vaga: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.title}>Criação de vaga de emprego</Text>
        <Text style={styles.subTitle}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#888"
          value={Titulo}
          onChangeText={setTitulo}
        />
        <Text style={styles.subTitle}>Localização</Text>
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#888"
          value={Localizacao}
          onChangeText={setLocalizacao}
        />
        <Text style={styles.subTitle}>Salário</Text>
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#888"
          value={Salario}
          onChangeText={setSalario}
        />
        <Text style={styles.subTitle}>Modelo de Trabalho</Text>
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#888"
          value={Forma_Trabalho}
          onChangeText={setForma_Trabalho}
        />
        
        {/* Benefícios */}
        <Text style={styles.subTitle}>Benefícios</Text>
        {Beneficios.map((beneficio, index) => (
          <Text key={index} style={styles.listItem}>- {beneficio}</Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#888"
          value={novoBeneficio}
          onChangeText={setNovoBeneficio}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarBeneficio}>
          <Text style={styles.addButtonText}>+ Adicionar Benefício</Text>
        </TouchableOpacity>

        {/* Exigências */}
        <Text style={styles.subTitle}>Exigências</Text>
        {Exigencias.map((exigencia, index) => (
          <Text key={index} style={styles.listItem}>- {exigencia}</Text>
        ))}
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#888"
          value={novaExigencia}
          onChangeText={setNovaExigencia}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarExigencia}>
          <Text style={styles.addButtonText}>+ Adicionar Exigência</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="..."
          placeholderTextColor="#888"
          value={Descricao}
          onChangeText={setDescricao}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Vaga</Text>
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
  addButton: {
    backgroundColor: '#6f00ff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 14,
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
});
