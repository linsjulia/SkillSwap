import { Stack} from "expo-router";
import "../styles/global.css";
import {} from "react-native";
import React from "react";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "#6f00ff",
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
            backgroundColor: "#111",
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
            backgroundColor: "#111",
          },
          headerTintColor: "#111",
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
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="empresa/(tabs)/profile"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
      name="login"
      options={{
        title: "Skill Swap",
        headerStyle: {
          backgroundColor: "#6f00ff"
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
            backgroundColor: "black",
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

      <Stack.Screen
        name="(stack)/curriculumDescription"
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
        name="(stack)/settings"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
         
        }}
      />


      <Stack.Screen
        name="(stack)/resetPassword"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="empresa/(tabs)"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="empresa/(tabs)/home"
        options={{
          title: "Skill Swap",
          
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
         
        }}
      />

      <Stack.Screen
        name="(stack)/CandidatosVaga"
        options={{
          title: 'Skill Swap',
          headerStyle: {
            backgroundColor: 'black'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />

        <Stack.Screen
          name="(stack)/editProfile"
          options={{
            title: "Skill Swap",
            headerStyle:{
              backgroundColor: 'black'
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        />
      
      <Stack.Screen
      name="(stack)/vagasCategory"
      options={{
        title: "Skill Swap",
        headerStyle:{
          backgroundColor: "black"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
      />

      <Stack.Screen
      name="(stack)/ApplicationConfirmationScreen"
      options={{
        title: "Skill Swap",
        headerStyle:{
          backgroundColor: "black"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
      />
      
      <Stack.Screen
      name="(stack)/candidaturasDoUser"
      options={{
        title: "Skill Swap",
        headerStyle:{
          backgroundColor: "black"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
      />

      <Stack.Screen
      name="(stack)/editProfilePJ"
      options={{
        title: "Skill Swap",
        headerStyle:{
          backgroundColor: "black"
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
      />

      <Stack.Screen
        name="(stack)/userCurriculum"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="(stack)/profileUser"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="empresa/(tabs)/editVacancy"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="(stack)/Vacancy"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />

     <Stack.Screen
        name="(stack)/menu"
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
        name="(stack)/profileUserPJ"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontFamily: "Inter",
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="(stack)/suport"
        options={{
          title: "Skill Swap",
          headerStyle: {
            backgroundColor: "black",
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
