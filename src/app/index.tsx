import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useRouter } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const hideSplashScreenAndRedirect = async () => {
    
      await new Promise(resolve => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync();
   
      router.replace("/login");
    };

    hideSplashScreenAndRedirect();
  }, [router]);

  return null; 
}
