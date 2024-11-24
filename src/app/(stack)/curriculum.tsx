import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db, setDoc, addDoc, collection, doc, getDoc } from '../../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Formacao {
  nome: string;
  endereco: string;
  dataNascimento: string;
  estadoCivil: string;
  sexo: string;
  instituicao: string;
  curso: string;
  nivelEscolaridade: string;
  inicioTermino: string;
  horario: string;
  experiencia: string;
  portfolio: string;
}

export default function CurriculumScreen() {
  const router = useRouter();
  const { vagaId, userId } = useLocalSearchParams();

  const [formacao, setFormacao] = useState<Formacao>({
    nome: '',
    endereco: '',
    dataNascimento: '',
    estadoCivil: '',
    sexo: '',
    instituicao: '',
    curso: '',
    nivelEscolaridade: '',
    inicioTermino: '',
    horario: '',
    experiencia: '',
    portfolio: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    if (!userId || !vagaId) {
      alert('Parâmetros de usuário ou vaga ausentes.');
      router.push('/');
      return;
    }

    const loadCurriculum = async () => {
      try {
        const userCurriculumRef = doc(db, 'Curriculo', userId as string);
        const userCurriculumSnapshot = await getDoc(userCurriculumRef);

        if (userCurriculumSnapshot.exists()) {
          const data = userCurriculumSnapshot.data();
          setFormacao({
            nome: data.Nome || '',
            endereco: data.Endereco || '',
            dataNascimento: data.DataNascimento || '',
            estadoCivil: data.EstadoCivil || '',
            sexo: data.Sexo || '',
            instituicao: data.Formacao[1] || '',
            curso: data.Formacao[2] || '',
            nivelEscolaridade: data.Formacao[0] || '',
            inicioTermino: data.Formacao[3] || '',
            horario: data.HorarioLetivo || '',
            experiencia: data.Experiencia || '',
            portfolio: data.PdfLink || ''
          });
        }
      } catch (error) {
        console.error('Erro ao carregar currículo:', error);
      }
    };

    loadCurriculum();
  }, [userId, vagaId]);

  const handleChange = (name: keyof Formacao, value: string) => {
    setFormacao({
      ...formacao,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const requiredFields: (keyof Formacao)[] = [
      'nome', 'endereco', 'dataNascimento', 'estadoCivil',
      'sexo', 'nivelEscolaridade', 'instituicao', 'curso', 'inicioTermino'
    ];

    for (const field of requiredFields) {
      if (!formacao[field]) {
        alert(`Por favor, preencha o campo: ${field}`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const curriculumData = {
        Data_Atualizacao: new Date().toISOString(),
        Experiencia: formacao.experiencia || '',
        Formacao: [formacao.nivelEscolaridade, formacao.instituicao, formacao.curso, formacao.inicioTermino],
        Id_Usuario: userId,
        DataNascimento: formacao.dataNascimento,
        Endereco: formacao.endereco,
        EstadoCivil: formacao.estadoCivil,
        HorarioLetivo: formacao.horario,
        Nome: formacao.nome,
        PdfLink: formacao.portfolio || '',
        Sexo: formacao.sexo
      };

      const userCurriculumRef = doc(db, "Curriculo", userId as string);
      const userCurriculumSnapshot = await getDoc(userCurriculumRef);

      if (userCurriculumSnapshot.exists()) {
        await setDoc(userCurriculumRef, curriculumData, { merge: true });
      } else {
        await setDoc(userCurriculumRef, curriculumData);
      }

      const candidaturaData = {
        Id_Usuario: userId,
        Id_Vaga: vagaId,
        DataCandidatura: new Date().toISOString()
      };

      await addDoc(collection(db, "Candidatura"), candidaturaData);

      setMessageVisible(true);
      setTimeout(() => router.push(`/(tabs)`), 2000);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao enviar currículo:", error);
      alert("Erro ao enviar os dados. Tente novamente.");
      setIsLoading(false);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleChange('dataNascimento', formattedDate);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Currículo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#888"
          value={formacao.nome}
          onChangeText={(text) => handleChange('nome', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#888"
          value={formacao.endereco}
          onChangeText={(text) => handleChange('endereco', text)}
        />
        <Pressable onPress={openDatePicker}>
          <Text style={[styles.input, { color: formacao.dataNascimento ? '#000' : '#888' }]}>
            {formacao.dataNascimento || 'Selecionar Data de Nascimento'}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={formacao.dataNascimento ? new Date(formacao.dataNascimento) : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Estado Civil"
          placeholderTextColor="#888"
          value={formacao.estadoCivil}
          onChangeText={(text) => handleChange('estadoCivil', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sexo"
          placeholderTextColor="#888"
          value={formacao.sexo}
          onChangeText={(text) => handleChange('sexo', text)}
        />
        <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
        <Text style={styles.label}>Nível de Escolaridade:</Text>
        <Picker
          selectedValue={formacao.nivelEscolaridade}
          style={styles.input}
          onValueChange={(itemValue: string) => handleChange('nivelEscolaridade', itemValue)}
        >
          <Picker.Item label="Selecione" value="" />
          <Picker.Item label="Ensino Médio" value="Ensino Médio" />
          <Picker.Item label="Ensino Superior" value="Ensino Superior" />
          <Picker.Item label="Pós-Graduação" value="Pós-Graduação" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Instituição"
          placeholderTextColor="#888"
          value={formacao.instituicao}
          onChangeText={(text) => handleChange('instituicao', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          placeholderTextColor="#888"
          value={formacao.curso}
          onChangeText={(text) => handleChange('curso', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Período de Início e Término"
          placeholderTextColor="#888"
          value={formacao.inicioTermino}
          onChangeText={(text) => handleChange('inicioTermino', text)}
        />
        <Text style={styles.label}>Horário Letivo:</Text>
        <View style={styles.radioGroup}>
          {['Matutino', 'Vespertino', 'Noturno', 'A distância'].map((value) => (
            <RadioButton.Group
              key={value}
              onValueChange={(newValue: string) => handleChange('horario', newValue)}
              value={formacao.horario}
            >
              <RadioButton value={value} />
              <Text style={styles.radioLabel}>{value}</Text>
            </RadioButton.Group>
          ))}
        </View>
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isLoading ? 'Enviando...' : 'Salvar e Enviar'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20,
  },
  title: { 
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  section: { 
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#6a00ff',
    shadowColor: '#6a00ff',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  sectionTitle: { 
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  input: { 
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#6a00ff',
    
  },
  label: { 
    color: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#6a00ff',
  },
  radioGroup: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    color: '#fff'
  
  },
  radioLabel: { 
    marginLeft: 0, 
    marginRight: 10,
    color: '#fff'
  },
  button: { 
    backgroundColor: '#6a00ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, 
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', 
  },
 
});
