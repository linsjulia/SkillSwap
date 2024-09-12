import { Text , View } from "react-native";
import { useFonts } from "expo-font";
import { InputsPassword, InputsText } from "../components/inputText";
import { ButtonLogin, CreateAccount, ImagesEnterprise, OthersLogins, ResetPassword } from "../components/login/loginComponets";

export default function Login() {
  const [loaded, error] = useFonts({
    Inter: require("../../assets/fonts/Inter.ttf"),
  });
  return (
    <View className="flex-1 bg-neutral-900">
      <Text className=" py-9 text-4xl ml-12 relative top-7 text-indigo-500" style={{ fontFamily: "Inter",fontWeight: "bold",}} > Login </Text>
      <View className="flex-1 items-center mt-11">
      <InputsText placaholder="Email:"/>
      <InputsPassword placaholder="Senha:"/>
      <ButtonLogin text="Login"/>
      <ResetPassword/>
      <OthersLogins/>
      <ImagesEnterprise/>
       <CreateAccount /> 
      </View>
    </View>
  );
}
