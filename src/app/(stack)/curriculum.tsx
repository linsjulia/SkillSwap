import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db, setDoc, addDoc, collection, doc, getDoc } from '../../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import React from 'react';

interface Formacao {
  portfolio: string;
  experiencia: string;
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
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          placeholderTextColor="#888"
          value={formacao.dataNascimento}
          onChangeText={(text) => handleChange('dataNascimento', text)}
        />
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
          placeholder="Nível de Escolaridade"
          placeholderTextColor="#888"
          value={formacao.nivelEscolaridade}
          onChangeText={(text) => handleChange('nivelEscolaridade', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Período de Início e Término"
          placeholderTextColor="#888"
          value={formacao.inicioTermino}
          onChangeText={(text) => handleChange('inicioTermino', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Horário Letivo"
          placeholderTextColor="#888"
          value={formacao.horario}
          onChangeText={(text) => handleChange('horario', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Experiência"
          placeholderTextColor="#888"
          value={formacao.experiencia}
          onChangeText={(text) => handleChange('experiencia', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Portfolio (Link)"
          placeholderTextColor="#888"
          value={formacao.portfolio}
          onChangeText={(text) => handleChange('portfolio', text)}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>Confirmar</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: '#6a00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
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
  button: {
    backgroundColor: '#6a00ff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
