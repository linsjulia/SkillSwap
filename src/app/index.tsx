import { Text , View } from "react-native";
import { useFonts } from "expo-font";
import { InputsPassword, InputsText } from "../components/inputText";
import { ButtonLogin, CreateAccount, ImagesEnterprise, OthersLogins, ResetPassword } from "../components/login/loginComponets";
import { useForm, Controller } from "react-hook-form";
import { useRouter, router } from "expo-router";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  //const [loaded, error] = useFonts({
   // Inter: require("../../assets/fonts/Inter.ttf"),
    
  //});

  const { control, handleSubmit, formState: { errors }, watch } = useForm<LoginFormData> ({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    router.replace("/(tabs)");
    
  }

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <View className="flex-1 bg-neutral-900">
      <Text className=" py-9 text-4xl ml-12 relative top-7 text-indigo-500" style={{ fontWeight: "bold",}} > Login </Text>
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
        {errors.email && <Text className="color-white">O email é obrigatório.</Text>}

        <Controller
          control = {control}
          rules ={{
            required: true,
      
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
          {errors.password && <Text className="color-white">A senha é obrigatória</Text>}
      
      <ButtonLogin text="Login" onPress={handleSubmit(onSubmit)}/>

      <ResetPassword/>
      <OthersLogins/>
      <ImagesEnterprise/>
       <CreateAccount /> 
      </View>
    </View>
  );
}
