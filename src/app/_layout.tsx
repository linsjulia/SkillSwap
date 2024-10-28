import { Stack} from "expo-router";
import "../styles/global.css";
import {} from "react-native";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
   

      <Stack.Screen
        name="(stack)/register"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="(tabs)/searchPage"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="(tabs)/notifications"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="(tabs)/profile"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
         <Stack.Screen
      name="(stack)/login"
      options={{
        title: "Login",
        headerStyle: {
          backgroundColor: "#"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        }
        }
      }

      />
      <Stack.Screen
        name="(stack)/jobDescription"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="(stack)/curriculum"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="(stack)/checkmark"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="(stack)/telaProcuraVagasPJ"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#212121",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
}
