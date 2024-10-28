import { View, Text, Alert, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useState } from "react";
import { LoginAccount, RegisterLogin, TabButtonsType, TabsButtons } from "../../components/register/registerComponents";
import { InputsPassword, InputsText } from "../../components/inputText";
import { Checkbox } from "../../components/Checkbox";
import { registerCompany, registerUser } from '../../back-end/authService'; 
import { useRouter, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import React from 'react';
import LottieView from 'lottie-react-native';



enum CustomTab {
  Tab1, // Pessoa Física
  Tab2, // Pessoa Jurídica
}

interface PessoaFisicaFormData {
  email: string;
  password: string;
  nome: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  
}

interface PessoaJuridicaFormData {
  email: string;
  password: string;
  nomeEmpresa: string;
  telefone: string;
  cnpj: string;
}

export default function Register() {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.Tab1);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess ] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Schema de validação para Pessoa Física
  const schemaPessoaFisica = yup.object({
    email: yup.string().email().required("Campo de texto obrigatório").email("Email inválido"),
    password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").matches(/[0-9]/, 'A senha deve conter pelo menos 1 número')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos 1 letra maiúscula')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos 1 caractere especial').required("Campo de texto obrigatório"),
    nome: yup.string().required("Campo de texto obrigatório"),
    telefone: yup.string().required("Campo de texto obrigatório"),
    dataNascimento: yup.string().required("Campo de texto obrigatório"),
    cpf: yup.string().required("Campo de texto obrigatório"),
  });

  // Schema de validação para Pessoa Jurídica
  const schemaPessoaJuridica = yup.object({
    email: yup.string().email().required("Campo de texto obrigatório").email("Email inválido"),
    password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").matches(/[0-9]/, 'A senha deve conter pelo menos 1 número')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos 1 letra maiúscula')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'A senha deve conter pelo menos 1 caractere especial').required("Campo de texto obrigatório"),
    nomeEmpresa: yup.string().required("Campo de texto obrigatório"),
    telefone: yup.string().required("Campo de texto obrigatório"),
    cnpj: yup.string().required("Campo de texto obrigatório"),
  });

  // Formulário para Pessoa Física
  const { control: controlPessoaFisica, handleSubmit: handleSubmitPessoaFisica, formState: { errors: errorsPessoaFisica } } = useForm<PessoaFisicaFormData>({
    resolver: yupResolver(schemaPessoaFisica),
  });

  // Formulário para Pessoa Jurídica
  const { control: controlPessoaJuridica, handleSubmit: handleSubmitPessoaJuridica, formState: { errors: errorsPessoaJuridica } } = useForm<PessoaJuridicaFormData>({
    resolver: yupResolver(schemaPessoaJuridica),
  });

  // Função de submissão do formulário para Pessoa Física
  const onSubmitPessoaFisica = async (data: PessoaFisicaFormData) => {
    setLoading(true);
    setIsSubmitting(true);

    try {
      await registerUser({
        email: data.email,
        password: data.password,
        nome: data.nome,
        telefone: data.telefone,
        dataNascimento: data.dataNascimento,
        cpf: data.cpf,
        
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.replace("/(tabs)");
        setIsSubmitting(false);
      }, 3000);
      //router.replace("/(tabs)");
    } catch (error) {
      setLoading(false);
      
    } finally {
     
    }
      
  };
  

  // Função de submissão do formulário para Pessoa Jurídica
  const onSubmitPessoaJuridica = async (data: PessoaJuridicaFormData) => {
    setLoading(true);
    setIsSubmitting(true);
    try {
      await registerCompany({
        email: data.email,
        password: data.password,
        nome: data.nomeEmpresa,  
        telefone: data.telefone,
        cnpj: data.cnpj,
        endereco: "", 
      });
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.replace('/(tabs)');
        setIsSubmitting(false);
        }, 3000);
      
    } catch (error) {
        setLoading(false);
    } finally{
      
    } 
  };
  

  const buttons: TabButtonsType[] = [
    { title: "Pessoa Física" },
    { title: "Pessoa Jurídica" },
  ];

  return (
    <ScrollView className="bg-neutral-900">
      <View className="items-center">
        <Text className="text-3xl my-4 text-sky-400" style={{ fontFamily: "Inter", fontWeight: "bold" }}>Crie sua conta</Text>
        
        <TabsButtons
          buttons={buttons}
          selectedTab={selectedTab}
          SetselectedTab={setSelectedTab}
        />
        
         {success ? (
          <View style={styles.overlay}>
        <LottieView
          source={require('../../../assets/animations/okay.json')} 
          autoPlay
          loop={false} 
          style={{ width: 170, height: 170 }}
        />
        </View>
          ) : null }  
          
          
      

        {/* Formulário para Pessoa Física */}
        {selectedTab === CustomTab.Tab1 && (
          <>
            <Controller
              control={controlPessoaFisica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="Nome completo:" 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="nome"
            />
            {errorsPessoaFisica.nome && <Text style={styles.labelError}>{errorsPessoaFisica.nome.message}</Text>}

            {/* Restante dos campos para Pessoa Física */}
              <Controller
                control={controlPessoaFisica}
                render={({ field: { onChange, onBlur, value} }) => (
                  <InputsText 
                  placaholder="CPF:" 
                  onBlur={onBlur}
                  onChangeText={onChange} 
                  value={value}
                  />
                )}  
                name="cpf"
              />
              {errorsPessoaFisica.nome && <Text style={styles.labelError}>{errorsPessoaFisica.nome.message}</Text>}

              <Controller
                control={controlPessoaFisica}
                render={({ field: { onChange, onBlur, value} }) => (
                  <InputsText 
                  placaholder="Telefone:" 
                  onBlur={onBlur}
                  onChangeText={onChange} 
                  value={value}
                  />
                )}  
                name="telefone"
              />
              {errorsPessoaFisica.telefone && <Text style={styles.labelError}>{errorsPessoaFisica.telefone.message}</Text>}
            

              <Controller
              control={controlPessoaFisica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="Data de nascimento:" 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="dataNascimento"
            />
            {errorsPessoaFisica.dataNascimento && <Text style={styles.labelError}>{errorsPessoaFisica.dataNascimento.message}</Text>}

            <Controller
              control={controlPessoaFisica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="Email:" 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errorsPessoaFisica.email && <Text style={styles.labelError}>{errorsPessoaFisica.email.message}</Text>}

            <Controller
              control={controlPessoaFisica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="Senha: " 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errorsPessoaFisica.password && <Text style={styles.labelError}>{errorsPessoaFisica.password.message}</Text>}

            

            <Checkbox label="Aceito os termos de uso do aplicativo." />
            <RegisterLogin text="Criar conta" 
            onPress={handleSubmitPessoaFisica(onSubmitPessoaFisica)} 
            disabled={isSubmitting} />
            {loading && <ActivityIndicator size="large" color="#6200ff" style={{ marginTop: 20 }} />}
          </>
        )}

        {/* Formulário para Pessoa Jurídica */}
        {selectedTab === CustomTab.Tab2 && (
          <>
            <Controller
              control={controlPessoaJuridica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="Nome da empresa:" 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="nomeEmpresa"
            />
            {errorsPessoaJuridica.nomeEmpresa && <Text style={styles.labelError}>{errorsPessoaJuridica.nomeEmpresa.message}</Text>}

            <Controller
              control={controlPessoaJuridica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="CNPJ:" 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="cnpj"
            />
            {errorsPessoaJuridica.cnpj && <Text style={styles.labelError}>{errorsPessoaJuridica.cnpj.message}</Text>}

            <Controller
              control={controlPessoaJuridica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="Telefone: " 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="telefone"
            />
            {errorsPessoaJuridica.telefone && <Text style={styles.labelError}>{errorsPessoaJuridica.telefone.message}</Text>}

            <Controller
              control={controlPessoaJuridica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="E-mail: " 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errorsPessoaJuridica.email && <Text style={styles.labelError}>{errorsPessoaJuridica.email.message}</Text>}

            <Controller
              control={controlPessoaJuridica}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputsText 
                  placaholder="Senha: " 
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errorsPessoaJuridica.password && <Text style={styles.labelError}>{errorsPessoaJuridica.password.message}</Text>}
          

            <Checkbox label="Aceito os termos de uso do aplicativo." />
            <RegisterLogin disabled={isSubmitting} text="Criar conta" onPress={handleSubmitPessoaJuridica(onSubmitPessoaJuridica)} />
            {loading && <ActivityIndicator size="large" color="#6200ff" style={{ marginTop: 20 }} />} 
            
          </>
        )}

        <LoginAccount />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  overlay: {
    
    position: 'absolute',
    zIndex: 10, 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 100, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  labelError: {
    alignSelf: 'flex-start',
    color: 'red',
    marginBottom: 10,
    marginLeft: 30,
  },
});
