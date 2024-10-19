import { Text , View } from "react-native";
import { useFonts } from "expo-font";
import { InputsPassword, InputsText } from "../components/inputText";
import { ButtonLogin, CreateAccount, ImagesEnterprise, OthersLogins, ResetPassword } from "../components/login/loginComponets";
import { useForm, Controller } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [loaded, error] = useFonts({
    Inter: require("../../assets/fonts/Inter.ttf"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData> ({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <Text className=" py-9 text-4xl ml-12 relative top-7 text-indigo-500" style={{ fontFamily: "",fontWeight: "bold",}} > Login </Text>
      <View className="flex-1 items-center mt-11">
        <Controller 
          control = {control}
          rules= {{
            required: true,
          }}
          render={({ field: {  onChange, onBlur, value } }) => (
            <InputsText 
            placaholder="Email:"
            onBlur = {onBlur}
            onChangeText={onChange}
            value={value}
            />
          )}
          name='email'
        />
        <Controller
          control = {control}
          rules ={{
            required: "A senha é obrigatória",
            minLength: {
              value: 8,
              message: "A senha deve ter pelo menos 8 caracteres",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "A senha deve conter pelo menos números e letras",
            }
          }}
          render={({ field: { onChange, onBlur, value }}) => (
            <InputsPassword 
            placaholder="Senha:" 
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            />
          )}
          name='password'
          
        
        />
      
      <ButtonLogin text="Login"/>
      <ResetPassword/>
      <OthersLogins/>
      <ImagesEnterprise/>
       <CreateAccount /> 
      </View>
    </View>
  );
}
