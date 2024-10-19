import { View, Text } from "react-native"; // Importa os componentes View e Text do React Native
import { LoginAccount, RegisterLogin, TabButtonsType ,  TabsButtons} from "../components/register/registerComponents"; // Importa os componentes da pasta register que fica em components
import { useState } from "react"; // Importa o useState do React
import { InputsPassword, InputsText } from "../components/inputText"; // Importa os  InputsText
import { Checkbox } from "../components/Checkbox"; // Importa o Checkbox

// Enumeração para definir as abas personalizadas
enum CustomTab {
  Tab1, // Pessoa Física
  Tab2, // Pessoa Jurídica
}

// Função principal do  Register
export default function Register() {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.Tab1); // Define o estado inicial da aba selecionada como Pessoa Física (Tab1)

  // Define os títulos das abas
  const buttons: TabButtonsType[] = [
    { title: "Pessoa Fisica" }, // Título para a aba Pessoa Física
    { title: "Pessoa Juridica" }, // Título para a aba Pessoa Juridica
  ];

 // Define os placeholders dos campos com base na aba selecionada
 // Isso e Operador Ternario ou seja um if na mesma linha ? signifca "if" e o : "else"
const nome = selectedTab === CustomTab.Tab1 ? "Nome completo:" : "Nome da empresa:"; 
const contato = selectedTab === CustomTab.Tab1 ? "Telefone:" : "Contato:"; 
const documento = selectedTab === CustomTab.Tab1 ? "Cpf:" : "Cnpj:"; 
const data = selectedTab === CustomTab.Tab1 ? "Data de nascimento:" : "Data de fundação:"; 
const email = selectedTab === CustomTab.Tab1 ? "E-mail:" : "E-mail corporativo:"; 

  return (
    <View className="items-center  bg-neutral-900">

      <Text className="text-3xl my-4 text-sky-400" style={{ fontFamily: "Inter",fontWeight: "bold",}} >Crie sua conta</Text>

      <TabsButtons
        buttons={buttons} // Passa os títulos das abas
        selectedTab={selectedTab} // Passa a aba selecionada
        SetselectedTab={setSelectedTab} // Função para alterar a aba selecionada
        />
      <InputsText placaholder={nome}/>
      <InputsText placaholder={documento}/>
      <InputsText placaholder={contato}/>
      <InputsText placaholder={data}/>
      <InputsText placaholder={email}/>
      <InputsPassword placaholder="Senha:"/>
      <Checkbox label="Aceito os termos de uso do aplicativo."/>
      <RegisterLogin text="Criar conta" onPress={function (): void {
        throw new Error("Function not implemented.");
      } }/>
      <LoginAccount/>

    </View>
  );
}