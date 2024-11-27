import React, { useState } from "react";
import { ScrollView, Pressable, Text, View, Image, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";

export interface TextButton {
  text: string;
  onPress: () => void;
}

const GitHubLogin = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(false); 

  const firebaseRedirectUrl = "https://skillswap-1104.firebaseapp.com/__/auth/handler";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=Ov23ctIhG1633Ta1Yx78&redirect_uri=${firebaseRedirectUrl}&scope=read:user`;

  const handleNavigationStateChange = async (event: { url: string }) => {
    const url = event.url;

    if (url.startsWith(firebaseRedirectUrl) && url.includes("code=")) {
      setLoading(true);
      setShowWebView(false); // Fecha o WebView

      const code = new URLSearchParams(new URL(url).search).get("code");

      try {
        if (code) {
          const credential = auth.GithubAuthProvider.credential(code);
          const userCredential = await auth().signInWithCredential(credential);

          console.log("Usuário logado:", userCredential.user);
        } else {
          console.error("Código de autenticação não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao autenticar:", error);
        alert("Falha ao autenticar. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading && <ActivityIndicator size="large" color="#6f00ff" />} 
      {!showWebView && !loading && (
        <Pressable
          style={{
            backgroundColor: "#6f00ff",
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          onPress={() => setShowWebView(true)}
        >
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Login com GitHub</Text>
        </Pressable>
      )}
      {showWebView && (
        <WebView
          source={{ uri: githubAuthUrl }}
          onNavigationStateChange={handleNavigationStateChange}
          style={{ flex: 1, width: "100%" }}
        />
      )}
    </View>
  );
};

export function ButtonLogin({ text, onPress }: TextButton) {
  return (
    <Pressable
      style={{ backgroundColor: "#6f00ff", padding: 10, borderRadius: 20 }}
      onPress={onPress}
    >
      <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
        {text}
      </Text>
    </Pressable>
  );
}

export function ResetPassword() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/(stack)/resetPassword")}>
      <Text
        style={{
          fontWeight: "700",
          letterSpacing: 1.3,
        }}
      >
        Esqueceu sua senha?
      </Text>
    </Pressable>
  );
}

export function OthersLogins() {
  return (
    <Pressable>
      <Text
        style={{
          fontWeight: "700",
          letterSpacing: 1.3,
          textAlign: "center",
        }}
      >
        ou logue com
      </Text>
    </Pressable>
  );
}

export function ImagesEnterprise() {
  const [showWebView, setShowWebView] = useState(false);

  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <Pressable style={{ backgroundColor: "#555", padding: 10, borderRadius: 10 }}>
        <Image source={require("../../assets/google.png")} style={{ width: 30, height: 30 }} />
      </Pressable>
      <Pressable style={{ backgroundColor: "#555", padding: 10, borderRadius: 10 }}>
        <Image source={require("../../assets/linkedin.png")} style={{ width: 30, height: 30 }} />
      </Pressable>
      <Pressable
        style={{ backgroundColor: "#555", padding: 10, borderRadius: 10 }}
        onPress={() => setShowWebView(true)}
      >
        <Image source={require("../../assets/github.png")} style={{ width: 30, height: 30 }} />
      </Pressable>
      {showWebView && (
        <WebView
          source={{
            uri: `https://github.com/login/oauth/authorize?client_id=Ov23ctIhG1633Ta1Yx78`,
          }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

export function CreateAccount() {
  const router = useRouter();

  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
      <Pressable onPress={() => router.replace("/register")}>
        <Text style={{ textAlign: "center", fontWeight: "700", letterSpacing: 1.3 }}>
          Não possui conta?
        </Text>
        <Text
          style={{
            textAlign: "center",
            textDecorationLine: "underline",
            fontWeight: "700",
            color: "#6f00ff",
          }}
        >
          Crie aqui!
        </Text>
      </Pressable>
    </View>
  );
}

export default GitHubLogin;
  