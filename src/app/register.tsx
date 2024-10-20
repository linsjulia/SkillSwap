import { View, Text, Alert } from "react-native";
import { useState } from "react";
import { LoginAccount, RegisterLogin, TabButtonsType, TabsButtons } from "../components/register/registerComponents";
import { InputsPassword, InputsText } from "../components/inputText";
import { Checkbox } from "../components/Checkbox";
import { registerCompany, registerUser } from '../back-end/authService'; 

enum CustomTab {
  Tab1, // Pessoa Física
  Tab2, // Pessoa Jurídica
}

export default function Register() {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.Tab1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState<Date | null>(null);
  const [cpfCnpj, setCpfCnpj] = useState('');

  const handleRegister = async () => {
    if (selectedTab === CustomTab.Tab1) {
      // Registro de Usuário
      if (!email || !password || !nome || !telefone || !dataNascimento || !cpfCnpj) {
        Alert.alert('Por favor, preencha todos os campos');
        return;
      }
      await registerUser({ email, password, nome, telefone, dataNascimento: dataNascimento!, cpf: cpfCnpj, });
    } else {
      // Registro de Empresa
      if (!email || !password || !nome || !telefone || !cpfCnpj) {
        Alert.alert('Por favor, preencha todos os campos');
        return;
      }
      await registerCompany({ email, password, nome, endereco: '', telefone, cnpj: cpfCnpj });
    }
  };

  const buttons: TabButtonsType[] = [
    { title: "Pessoa Física" },
    { title: "Pessoa Jurídica" },
  ];

  const nomeLabel = selectedTab === CustomTab.Tab1 ? "Nome completo:" : "Nome da empresa:";
  const documentoLabel = selectedTab === CustomTab.Tab1 ? "CPF:" : "CNPJ:";

  return (
    <View className="items-center bg-neutral-900">
      <Text className="text-3xl my-4 text-sky-400" style={{ fontFamily: "Inter", fontWeight: "bold" }}>Crie sua conta</Text>

      <TabsButtons
        buttons={buttons}
        selectedTab={selectedTab}
        SetselectedTab={setSelectedTab}
      />
      <InputsText placaholder={nomeLabel} onChangeText={setNome} />
      <InputsText placaholder={documentoLabel} onChangeText={setCpfCnpj} />
      <InputsText placaholder="Telefone:" onChangeText={setTelefone} />
      {selectedTab === CustomTab.Tab1 && (
        <InputsText placaholder="Data de nascimento:" onChangeText={(date) => setDataNascimento(new Date(date))} />
      )}
      <InputsText placaholder="E-mail:" onChangeText={setEmail} />
      <InputsPassword placaholder="Senha:" onChangeText={setPassword} />
      <Checkbox label="Aceito os termos de uso do aplicativo." />
      <RegisterLogin text="Criar conta" onPress={handleRegister} />
      <LoginAccount />
    </View>
  );
}
